import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import notFoundHandler from './app/middlewares/notFoundHandler'
import router from './app/routes'

const app = express()

//parser
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'https://driver.solar-ict.com',
      'https://cm.solar-ict.com',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  }),
)
app.set('trust proxy', true)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(cookieParser())

app.use('/api/v1', router)

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'successfully working Express Backend setup Application greatly',
  })
})
// handle not found route
app.use(notFoundHandler)
// handle global error handler
app.use(globalErrorHandler)

export default app
