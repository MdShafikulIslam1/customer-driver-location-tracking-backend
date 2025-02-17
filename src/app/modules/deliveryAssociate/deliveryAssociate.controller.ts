import httpStatus from 'http-status'
import catchAsync from '../../../helpers/catchAsync'
import sendResponse from '../../../helpers/sendResponse'
import DeliveryAssociateService from './deliveryAssociate.service'

const create = catchAsync(async (req, res) => {
  const result = await DeliveryAssociateService.create(req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Delivery associate created successfully',
    data: result,
  })
})

const getDeliveryAssociate = catchAsync(async (req, res) => {
  const id = req.params.deliveryAssociateId
  const result = await DeliveryAssociateService.getDeliveryAssociate(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Delivery associate retrieve successfully',
    data: result,
  })
})

const DeliveryAssociateController = {
  create,
  getDeliveryAssociate,
}

export default DeliveryAssociateController
