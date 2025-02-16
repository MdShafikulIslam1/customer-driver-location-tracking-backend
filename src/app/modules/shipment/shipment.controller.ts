import httpStatus from 'http-status'
import catchAsync from '../../../helpers/catchAsync'
import sendResponse from '../../../helpers/sendResponse'
import ShipmentService from './shipment.service'

const createShipment = catchAsync(async (req, res) => {
  const shipment = await ShipmentService.createShipment(req.body)

  sendResponse(res, {
    success: true,
    message: 'Shipment created successfully',
    data: shipment,
    statusCode: httpStatus.OK,
  })
})

const ShipmentController = {
  createShipment,
}

export default ShipmentController
