import { v4 as uuidv4 } from 'uuid';
import { ApiUser } from '../api-classes';
import { requester } from '../requester';

const generateRandomEmail = () => `${(Date.now() + uuidv4()).substring(0, 20)}@example.com`;

/**
 * Create a new user.
 * @param {Object} update Object containing updated values.
 * @param {Object} overrides Object containing values to manually set user details.
 * @returns {Object} The newly created user object.
 */
export const generateUser = async (update = {}, overrides = {}) => {
  const name = 'John Doe';
  const email = overrides.email || generateRandomEmail();
  const password = overrides.password || 'password';

  const {
    data: { user },
  } = await requester().post('/users/auth/register', {
    name,
    email,
    password,
  });

  const apiUser = new ApiUser(user);

  await apiUser.update(update);

  return apiUser;
};
