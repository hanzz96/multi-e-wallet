import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/appError';

// Placeholder for DB-specific errors (customize as needed for PostgreSQL or Sequelize)
const handleDuplicateFieldsDB = (err: any) => {
  const message = `Duplicate field value. Please use another value.`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err: any) => {
  const messages = Object.values(err.errors || {}).map((el: any) => el.message);
  const message = `Invalid input data. ${messages.join('. ')}`;
  return new AppError(message, 400);
};

const handleJWTError = () => new AppError('Invalid token, please login again!', 401);
const handleJWTExpiredError = () => new AppError('Your token is expired, please login again.', 401);
const handleLockError = () => new AppError('Please try again later.', 409);

const sendErrorDev = (err: any, res: Response) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

const sendErrorProd = (err: any, res: Response) => {
  if (err.isOperational) {
    console.error('ERROR PROD :', err);
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error('ERROR :', err);
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!',
    });
  }
};

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let errorOverride = err;

    if (err.name === 'SequelizeUniqueConstraintError') {
      errorOverride = handleDuplicateFieldsDB(err);
    }

    if (err.name === 'SequelizeValidationError') {
      errorOverride = handleValidationErrorDB(err);
    }

    if (err.name === 'JsonWebTokenError') {
      errorOverride = handleJWTError();
    }

    if (err.name === 'TokenExpiredError') {
      errorOverride = handleJWTExpiredError();
    }

    if( err.name === 'LockError') {
      errorOverride = handleLockError();
    }

    sendErrorProd(errorOverride, res);
  }
};