import nconf from 'nconf';
import jwt from 'jsonwebtoken';
import { model as User } from '../resources/users';

const JSON_WEB_TOKEN_SECRET = nconf.get('JSON_WEB_TOKEN_SECRET');

const errorRes = {
  success: false,
  error: 'NotAuthorized',
  message: 'You are not authorized to access this route.',
};

/**
 * Authenticate a request through `Bearer {token}` header.
 * If optional is true, don't throw error on missing authentication.
 * @param {Object} options Additional options to be passed to the middleware.
 * @return {Function} The middleware function.
 */
export const authWithBearerToken = (options = {}) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  async function authWithBearerTokenHandler(req, res, next) {
    let token;
    const optional = options.optional || false;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1]; // eslint-disable-line prefer-destructuring
    }

    if (!token && !optional) {
      return res.status(401).json(errorRes);
    }

    if (!token && optional) return next();

    try {
      const decoded = jwt.verify(token, JSON_WEB_TOKEN_SECRET || 'secret');
      const user = await User.findById(decoded.id);

      if (!user) res.status(401).json(errorRes);

      req.user = user.toJSON();
      return next();
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ ...errorRes, message: 'Token expired.' });
      }

      return res.status(401).json({ ...errorRes, message: 'Unable to authenticate token.' });
    }
  };
