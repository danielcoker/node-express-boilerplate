import { NotAuthorized } from '../../libs/errors';
import { model as User } from './model';

import { generateToken, getUserByEmail } from '../../libs/user';
import { bcryptCompare } from '../../libs/password';

/**
 * Creates a new user.
 * @param {Object} data Request data from the controller.
 * @returns {String} The created user token.
 */
export const register = async (data) => {
  const { name, email, password } = data;

  const existingUser = await getUserByEmail(email);
  if (existingUser) throw new NotAuthorized('User with this email already exist.');

  const newUser = new User({
    name,
    email,
    password,
  });

  await newUser.save();

  const token = generateToken(newUser.toJSON());

  return { ...newUser.toJSON(), token };
};

/**
 * Login a user with email and password.
 * @param {Object} data Request data fromt the controller.
 * @returns {Object} Object containing the logged user token and user object.
 */
export const login = async (data) => {
  const { email, password } = data;

  const user = await getUserByEmail(email);
  if (!user) throw new NotAuthorized('User with this email does not exist.');

  if (!bcryptCompare(password, user.password)) throw new NotAuthorized('Incorrect password.');

  const token = generateToken(user.toJSON());

  return { ...user.toJSON(), token };
};
