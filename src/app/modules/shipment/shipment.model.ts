import mongoose, { Schema } from 'mongoose'
import { ShipmentStatus } from '../../../enums'
import { IShipment } from './shipment.interface'

const ShipmentSchema: Schema = new Schema<IShipment>(
  {
    customerLocation: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(ShipmentStatus),
      required: true,
    },
    deliveryAssociateId: {
      type: Schema.Types.ObjectId,
      ref: 'deliveryassociate',
      required: false,
    },
  },
  { timestamps: true },
)

const Shipment = mongoose.model<IShipment>('shipment', ShipmentSchema)
export default Shipment
