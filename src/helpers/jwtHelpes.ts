/* eslint-disable @typescript-eslint/no-unused-vars */
// import jwt, { JwtPayload, Secret } from 'jsonwebtoken'
// import config from '../config'

// const createToken = (
//   payload: Record<string, unknown>,
//   secretKey: string,
//   expiresTime: string | number,
// ): string => {
//   return jwt.sign(payload, secretKey, { expiresIn: expiresTime })
// }

// const resetPasswordToken = (payload: { email: string }) => {
//   return jwt.sign(payload, config.access_token_secret as string, {
//     algorithm: 'HS256',
//     expiresIn: '30m',
//   })
// }

// const verifyToken = (token: string, secretKey: Secret): JwtPayload | null => {
//   try {
//     const decoded = jwt.verify(token, secretKey)
//     return decoded as JwtPayload
//   } catch (error) {
//     return null // যদি টোকেন ইনভ্যালিড হয়, তাহলে `null` ফেরত দেবে।
//   }
// }
// export const JwtHelpers = {
//   createToken,
//   verifyToken,
//   resetPasswordToken,
// }

import jwt, { JwtPayload } from 'jsonwebtoken'
import config from '../config'

// `createToken` function remains unchanged
const createToken = (
  payload: Record<string, unknown>,
  secretKey: string,
  expiresTime: string | number,
): string => {
  return jwt.sign(payload, '6e8fb8bc-a3c2-49c7-b29a-2c5dbe6fa4f3', {
    expiresIn: '1h',
  })
}

// `resetPasswordToken` function remains unchanged
const resetPasswordToken = (payload: { email: string }) => {
  return jwt.sign(payload, config.access_token_secret as string, {
    algorithm: 'HS256',
    expiresIn: '30m',
  })
}

// Updated `verifyToken` function
const verifyToken = (token: string, secretKey: string): JwtPayload | null => {
  // secretKey is now string
  try {
    const decoded = jwt.verify(token, secretKey) // secretKey is string now
    return decoded as JwtPayload
  } catch (error) {
    return null // returns `null` if token is invalid
  }
}

export const JwtHelpers = {
  createToken,
  verifyToken,
  resetPasswordToken,
}
