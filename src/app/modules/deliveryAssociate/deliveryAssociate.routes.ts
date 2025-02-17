import { Router } from 'express'
import DeliveryAssociateController from './deliveryAssociate.controller'

const router = Router()

router.post('/create', DeliveryAssociateController.create)

router.get(
  '/:deliveryAssociateId',
  DeliveryAssociateController.getDeliveryAssociate,
)

const DeliveryAssociateRouter = router

export default DeliveryAssociateRouter
