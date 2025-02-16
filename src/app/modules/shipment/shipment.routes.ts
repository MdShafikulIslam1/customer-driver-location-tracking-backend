import { Router } from 'express'
import ShipmentController from './shipment.controller'

const router = Router()

router.post('/create', ShipmentController.createShipment)

const ShipmentRouter = router

export default ShipmentRouter
