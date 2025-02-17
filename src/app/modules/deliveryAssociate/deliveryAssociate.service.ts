import bcrypt from 'bcrypt'
import httpStatus from 'http-status'
import { DeliveryAssociateStatus } from '../../../enums'
import ApiError from '../../../error/ApiError'
import { IDeliveryAssociate } from './deliveryAssociate.interface'
import DeliveryAssociate from './deliveryAssociate.model'

const create = async (payload: IDeliveryAssociate) => {
  const isDeliveryExist = await DeliveryAssociate.findOne({
    email: payload.email,
  })

  if (isDeliveryExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already exists')
  }

  const hashedPassword = await bcrypt.hash(payload.password, 12)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  delete (payload as any)['password']
  const deliveryAssociate = await DeliveryAssociate.create({
    ...payload,
    status: DeliveryAssociateStatus.available,
    password: hashedPassword,
  })

  return deliveryAssociate
}

const getDeliveryAssociate = async (id: string) => {
  const isDeliveryExist = await DeliveryAssociate.findById(id)
  if (!isDeliveryExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Delivery associate not found')
  }

  return isDeliveryExist
}

const DeliveryAssociateService = {
  create,
  getDeliveryAssociate,
}

export default DeliveryAssociateService
