import http from 'http'
import mongoose from 'mongoose'
import { Server } from 'socket.io'
import app from './app'
import Shipment from './app/modules/shipment/shipment.model'
import config from './config'
import { socketEvents } from './constant'
import { ISubscribeToShipment } from './interfaces/common'
const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: [config.frontend_url as string],
    methods: ['GET', 'POST'],
  },
})

async function main() {
  try {
    await mongoose.connect(config.db_uri as string)
    // Handle socket connection
    io.on('connection', socket => {
      console.log(`🔌 User connected: ${socket.id}`)

      // Handle disconnection
      socket.on('disconnect', () => {
        console.log(`❌ User disconnected: ${socket.id}`)
      })

      // SUBSCRIBE_TO_SHIPMENT
      socket.on(
        socketEvents.SUBSCRIBE_TO_SHIPMENT,
        (data: ISubscribeToShipment) => {
          socket.join(data.shipmentId)
        },
      )

      // MongoDB Change Streams
      const watchOptions = {
        fullDocument: 'updateLookup',
      }

      Shipment.watch([], watchOptions).on('change', (data: any) => {
        const fullDocument = data?.fullDocument
        console.log(' change stream full document: ', fullDocument)

        if (data.operationType === 'insert') {
          // Broadcast Shipment Available Msg to Delivery Associates
          io.emit(socketEvents.SHIPMENT_CREATED, fullDocument)
        }
        if (data.operationType === 'update') {
          io.to(String(fullDocument._id)).emit(
            socketEvents.SHIPMENT_UPDATED,
            fullDocument,
          )
        }
      })
    })

    server.listen(config.port, () => {
      // eslint-disable-next-line no-console
      console.log(
        `Express Backend Setup Application listening on port ${config.port}`,
      )
    })
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('failed to connect', error)
  }
}
main()
