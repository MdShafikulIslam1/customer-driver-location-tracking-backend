import dotenv from 'dotenv'
import path from 'path'
dotenv.config({ path: path.join(process.cwd(), '.env') })
export default {
  port: process.env.PORT,
  env: process.env.NODE_ENV,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  db_uri: process.env.DB_URI,
  jwt: {
    secret: process.env.ACCESS_TOKEN_SECRET as string,
    expires_in: process.env.JWT_EXPIRES_IN || '1h',
  },
  frontend_url:
    process.env.NODE_ENV === 'production'
      ? (process.env.FRONTEND_URL_PRODUCTION as string)
      : process.env.FRONTEND_URL,
}
