import logger from './logger';
import { CustomError, BadRequest, InternalServerError } from './errors';

/**
 * Handles errors thrown in the app.
 * @param {Object} err The error object.
 * @return {Object} Object containing the responseErr and jsonRes objects.
 */
const errorHandler = (err) => {
  // In case of a CustomError class, use it's data.
  // Otherwise try to identify the type of error (mongoose validation, etc).
  // If we can't identify it, respond with generic 500 error.
  let responseErr = err instanceof CustomError ? err : null;

  // Handle errors that have a statuscode property.
  if (err.statusCode && typeof err.statusCode === 'number') {
    responseErr = new CustomError();
    responseErr.httpCode = err.statusCode;
    responseErr.name = err.name;
    responseErr.message = err.message;
  }

  // Handle mongoose validation errors.
  if (err.name === 'ValidationError') {
    const model = err.message.split(' ')[0];

    responseErr = new BadRequest(`${model} validation failed.`);
    responseErr.errors = {
      message: err.message,
      path: err.path,
      value: err.value,
    };
  }

  if (!responseErr || responseErr.httpCode >= 500 || responseErr.httpCode === undefined) {
    // Try to identify the error...
    // ...
    // Otherwise create an InternalServerError.
    // Use it also in case of identified errors but with httpCode === 500 or;
    // httpCode === undefined.
    responseErr = new InternalServerError();
    logger.error(err);
  }

  const jsonRes = {
    success: false,
    error: responseErr.name,
    message: responseErr.message,
    errors: responseErr.errors ? responseErr.errors : undefined,
  };

  return { responseErr, jsonRes };
};

// eslint-disable-next-line new-cap
export default errorHandler;
