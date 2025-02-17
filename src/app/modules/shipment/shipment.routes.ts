import { Router } from 'express'
import ShipmentController from './shipment.controller'

const router = Router()

router.post('/create', ShipmentController.createShipment)

router.patch('/update-shipment/:id', ShipmentController.updateShipment)

const ShipmentRouter = router

export default ShipmentRouter
