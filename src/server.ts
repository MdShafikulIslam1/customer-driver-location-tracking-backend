import http from 'http'
import mongoose from 'mongoose'
import { Server } from 'socket.io'
import app from './app'
import config from './config'

async function main() {
  try {
    await mongoose.connect(config.db_uri as string)

    // Create an HTTP server
    const server = http.createServer(app)

    // Initialize Socket.io
    const io = new Server(server, {
      cors: {
        origin: [config.frontend_url as string],
        methods: ['GET', 'POST'],
      },
    })

    // Handle socket connection
    io.on('connection', socket => {
      console.log(`🔌 User connected: ${socket.id}`)

      // Handle disconnection
      socket.on('disconnect', () => {
        console.log(`❌ User disconnected: ${socket.id}`)
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
