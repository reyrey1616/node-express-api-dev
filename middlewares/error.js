const ErrorResponse = require('../utils/errorResponse');
const errorHandler = (err, req, res, next) => {
  console.log(err);

  let error = { ...err };
  error.message = err.message;

  // Mongoose bad objectId
  if (err.name === 'CastError') {
    const message = `Resource not found`;
    error = new ErrorResponse(message, 404);
  }

  //   Mongoose duplicate key error
  if (err.code === 11000) {
    const message = 'Duplicate value entered';
    error = new ErrorResponse(message, 400);
  }

  //   Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }

  res
    .status(error.statusCode || 500)
    .json({ success: false, error: error.message || 'Internal Server Error' });
};

module.exports = errorHandler;
