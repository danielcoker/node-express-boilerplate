import handleError from '../libs/errorHandler';

/**
 * Handle errors thrown from the app.
 * @param {Object} err The error object
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 * @param {Function} next Function to call the next middleware.
 */
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  const { responseErr, jsonRes } = handleError(err);
  res.status(responseErr.httpCode).json(jsonRes);
};

export default errorHandler;
