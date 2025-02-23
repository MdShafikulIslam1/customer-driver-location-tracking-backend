import jwt, { JwtPayload, Secret } from 'jsonwebtoken'
import config from '../config'

const createToken = (
  payload: Record<string, unknown>,
  secretKey: string,
  expiresTime: string | number,
): string => {
  return jwt.sign(payload, secretKey, { expiresIn: expiresTime })
}

const resetPasswordToken = (payload: { email: string }) => {
  return jwt.sign(payload, config.access_token_secret as string, {
    algorithm: 'HS256',
    expiresIn: '30m',
  })
}

const verifyToken = (token: string, secretKey: Secret): JwtPayload | null => {
  try {
    const decoded = jwt.verify(token, secretKey)
    return decoded as JwtPayload
  } catch (error) {
    return null // যদি টোকেন ইনভ্যালিড হয়, তাহলে `null` ফেরত দেবে।
  }
}
export const JwtHelpers = {
  createToken,
  verifyToken,
  resetPasswordToken,
}
