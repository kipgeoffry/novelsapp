const mongoose = require('mongoose');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
require('dotenv').config();


//convert error that are not instances of ApiError to an instance of ApiError
const errorConverter = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    console.log(error);
    const statusCode =
      error.statusCode || error instanceof mongoose.Error ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new ApiError(statusCode, message, false, err.stack);
  }
  next(error);
};

const errorHandler = (err, req, res, next) => {
   const { statusCode, message } = err;
      //handle all other errors by returning Internal server error
        if (process.env.DEPLOY_ENV === "prod" && !err.isOperational) {  //for errors that are not instances of APIError return server error and console log the error
            statusCode = httpStatus.INTERNAL_SERVER_ERROR;
            message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
        }
        const response = {
          code: statusCode,
          message:message,
          ...(process.env.DEPLOY_ENV === "dev" && { stackTrace: err.stack }), //if environmentis dev,show the stacktrace
        };

        res.status(statusCode).send(response);
}

module.exports ={
    errorConverter,
    errorHandler,
}