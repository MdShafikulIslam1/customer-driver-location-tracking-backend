import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'

// (req: Request, res: Response, next: NextFunction) => {
//  res.status(httpStatus.NOT_FOUND).json({
//    success: false,
//    message: "Not Found",
//    errorMessages: {
//      path: req.originalUrl,
//      message: "Not Found",
//    },
//  });
//  next();
// }

const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: {
      path: req.originalUrl,
      message: 'Not Found',
    },
  })
  next()
}
export default notFoundHandler
