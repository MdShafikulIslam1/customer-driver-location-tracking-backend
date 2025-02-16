import { Router } from 'express'
import UserController from './user.controller'

const router = Router()

router.get('/:userId', UserController.getSingleUser)

router.post('/sign-up', UserController.createUser)

router.post('/login', UserController.login)

router.post('/verify-login', UserController.verifyLogin)

const UserRouter = router

export default UserRouter
