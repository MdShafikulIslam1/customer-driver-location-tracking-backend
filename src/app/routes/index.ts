import { Router } from 'express'
import ShipmentRouter from '../modules/shipment/shipment.routes'
import UserRouter from '../modules/user/user.routes'

const router = Router()

const moduleRoutes = [
  {
    path: '/user',
    route: UserRouter,
  },
  {
    path: '/shipment',
    route: ShipmentRouter,
  },
]

moduleRoutes.forEach(route => {
  router.use(route.path, route.route)
})

export default router
