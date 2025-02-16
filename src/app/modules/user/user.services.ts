/* eslint-disable @typescript-eslint/no-explicit-any */
import bcrypt from 'bcrypt'
import httpStatus from 'http-status'
import config from '../../../config'
import ApiError from '../../../error/ApiError'
import { JwtHelpers } from '../../../helpers/jwtHelpes'
import { IUser } from './user.interface'
import User from './user.model'

const createUser = async (payload: IUser) => {
  const hashedPassword = await bcrypt.hash(payload.password, 12)

  delete (payload as any)['password']
  const user = await User.create({
    ...payload,
    password: hashedPassword,
  })

  return user
}

const login = async (payload: { email: string; password: string }) => {
  const user = await User.findOne({ email: payload.email })

  if (!user) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Invalid password. Please try again.',
    )
  }

  if (
    user.password &&
    !(await bcrypt.compare(payload.password, user.password))
  ) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      'Email or Password is incorrect',
    )
  }

  const jwtPayload = {
    _id: user._id,
    email: user.email,
    role: user.role,
  }
  const accessToken = JwtHelpers.createToken(
    jwtPayload,
    config.jwt.secret as string,
    config.jwt.expires_in as string,
  )

  const responseData = {
    _id: user._id,
    name: user.name,
    role: user.role,
    email: user.email,
    accessToken,
  }
  return responseData
}

const verifyLogin = async (payload: { email: string; password: string }) => {
  const user = await User.findOne({ email: payload.email })
  if (!user) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Invalid password. Please try again.',
    )
  }

  if (
    user.password &&
    !(await bcrypt.compare(payload.password, user.password))
  ) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      'Email or Password is incorrect',
    )
  }

  return { message: 'verification success' }
}

const getSingleUser = async (userId: string) => {
  const user = await User.findById(userId)

  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid user. Please try again')
  }

  return user
}

const UserService = {
  createUser,
  login,
  verifyLogin,
  getSingleUser,
}
export default UserService
