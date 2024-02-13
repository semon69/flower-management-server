import { ErrorRequestHandler } from "express";

export const globalErrorHandler: ErrorRequestHandler = (
  error,
  req,
  res,
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  next,
) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || 'Something went wrong';
  const errorMessage = error.errorMessage || 'Something went wrong';


  return res.status(statusCode).json({
    success: false,
    message: message,
    errorMessage: errorMessage,
    stack:error.stack
  });
};
