import httpStatus from 'http-status'
import catchAsync from '../../../helpers/catchAsync'
import sendResponse from '../../../helpers/sendResponse'
import UserService from './user.services'

const createUser = catchAsync(async (req, res) => {
  const result = await UserService.createUser(req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created successfully',
    data: result,
  })
})

const login = catchAsync(async (req, res) => {
  const result = await UserService.login(req.body)
  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'login completed successfully',
    data: result,
  })
})

const verifyLogin = catchAsync(async (req, res) => {
  const result = await UserService.verifyLogin(req.body)
  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'login verification successfully',
    data: result,
  })
})

const getSingleUser = catchAsync(async (req, res) => {
  const userId = req.params.userId
  const result = await UserService.getSingleUser(userId)
  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user retrieve successfully',
    data: result,
  })
})

const UserController = {
  createUser,
  login,
  verifyLogin,
  getSingleUser,
}

export default UserController
