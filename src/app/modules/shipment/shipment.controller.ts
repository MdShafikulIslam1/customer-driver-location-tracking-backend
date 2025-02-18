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

const updateShipment = catchAsync(async (req, res) => {
  const shipmentId = req.params.id
  const shipment = await ShipmentService.updateShipment(req.body, shipmentId)
  sendResponse(res, {
    success: true,
    message: 'Shipment updated successfully',
    data: shipment,
    statusCode: httpStatus.OK,
  })
})

const ShipmentController = {
  createShipment,
  updateShipment,
}

export default ShipmentController
