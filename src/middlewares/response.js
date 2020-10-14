/**
 * Middleware to handle responses.
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 * @param {Function} next Function to call the next middleware.
 */
const responseHandler = (req, res, next) => {
  // Only used for successful reponse.
  res.respond = function respond(status = 200, data = {}, message) {
    const response = {
      success: status < 400,
      message: message || undefined,
      data,
    };

    res.status(status).json(response);
  };

  next();
};

export default responseHandler;
