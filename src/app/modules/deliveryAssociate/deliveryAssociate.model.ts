import mongoose, { Schema } from 'mongoose'
import { DeliveryAssociateStatus, UserRole } from '../../../enums'
import { IDeliveryAssociate } from './deliveryAssociate.interface'

const DeliveryAssociateSchema: Schema = new Schema<IDeliveryAssociate>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.driver,
    },
    status: {
      type: String,
      enum: Object.values(DeliveryAssociateStatus),
      required: true,
    },
    currentLocation: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
  },
  { timestamps: true },
)

const DeliveryAssociate = mongoose.model<IDeliveryAssociate>(
  'deliveryassociate',
  DeliveryAssociateSchema,
)
export default DeliveryAssociate
