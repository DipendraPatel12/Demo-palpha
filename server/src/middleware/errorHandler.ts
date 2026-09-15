import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

export interface AppError extends Error {
  statusCode?: number;
}

export const errorHandler = (
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  // Handle Mongoose CastError (e.g., invalid ObjectId)
  if (err instanceof mongoose.Error.CastError) {
    statusCode = 400;
    message = `Invalid format for field '${err.path}': ${err.value}`;
  }

  // Handle Mongoose ValidationError
  if (err instanceof mongoose.Error.ValidationError) {
    statusCode = 400;
    const errors = Object.values(err.errors).map((e) => e.message);
    message = errors.join(', ');
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' ? { stack: err.stack } : {}),
  });
};

export const notFoundHandler = (_req: Request, res: Response): void => {
  res.status(404).json({
    success: false,
    message: 'API route not found',
  });
};
