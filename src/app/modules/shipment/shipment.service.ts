import httpStatus from 'http-status'
import { ShipmentStatus } from '../../../enums'
import ApiError from '../../../error/ApiError'
import DeliveryAssociate from '../deliveryAssociate/deliveryAssociate.model'
import User from '../user/user.model'
import { IShipment } from './shipment.interface'
import Shipment from './shipment.model'

const createShipment = async (payload: {
  lat: number
  lng: number
  userId: string
}) => {
  const isUserExist = await User.findById(payload.userId)

  if (!isUserExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User not found')
  }

  const shipment = await Shipment.create({
    customerLocation: {
      lat: payload.lat,
      lng: payload.lng,
    },
    userId: payload.userId,
    status: ShipmentStatus.requested,
  })
  return shipment
}

const updateShipment = async (payload: Partial<IShipment>, id: string) => {
  const isShipmentExist = await Shipment.findById(id)

  if (!isShipmentExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Shipment not found')
  }

  const isDeliveryAssociateExist = await DeliveryAssociate.findById(
    payload.deliveryAssociateId,
  )

  if (payload.deliveryAssociateId && !isDeliveryAssociateExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Delivery associate not found')
  }

  const updatedShipment = await Shipment.findByIdAndUpdate(id, payload, {
    new: true,
  })

  return updatedShipment
}

const ShipmentService = {
  createShipment,
  updateShipment,
}

export default ShipmentService
