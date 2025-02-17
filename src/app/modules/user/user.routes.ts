import { Router } from 'express'
import UserController from './user.controller'

const router = Router()

router.get('/:userId', UserController.getSingleUser)

router.post('/sign-up', UserController.createUser)

router.post('/login', UserController.login)

router.post('/delivery-login', UserController.deliveryLogin)

router.post('/verify-login', UserController.verifyLogin)

router.post(
  '/delivery-associate-verify-login',
  UserController.deliveryAssociateVerifyLogin,
)

const UserRouter = router

export default UserRouter
