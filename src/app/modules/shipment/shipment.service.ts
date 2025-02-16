import httpStatus from 'http-status'
import { ShipmentStatus } from '../../../enums'
import ApiError from '../../../error/ApiError'
import User from '../user/user.model'
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

const ShipmentService = {
  createShipment,
}

export default ShipmentService
