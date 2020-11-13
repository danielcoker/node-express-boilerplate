/* eslint-disable import/prefer-default-export */
import nconf from 'nconf';
import jwt from 'jsonwebtoken';
import { model as User } from '../../resources/users/model';

const JSON_WEB_TOKEN_SECRET = nconf.get('JSON_WEB_TOKEN_SECRET');
const JSON_WEB_TOKEN_EXPIRE = nconf.get('JSON_WEB_TOKEN_EXPIRE');

/**
 * Get a single user from the database with an email address.
 * @param {String} email The email of the user to get.
 * @returns {Object} The user gotten from the database.
 */
export const getUserByEmail = async (email) => {
  if (!email) throw new Error('Email is required.');

  const user = User.findOne({ email: email.toLowerCase() });
  return user;
};

/**
 * Generates the user's api token that must be used to authenticate requests.
 * @param {Object} payload The information to embed in token.
 * @returns {String} The token.
 */
export const generateToken = (payload) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  jwt.sign(payload, JSON_WEB_TOKEN_SECRET, {
    expiresIn: JSON_WEB_TOKEN_EXPIRE,
  });
