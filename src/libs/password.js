import bcrypt from 'bcrypt';

/**
 * Async function to hash user password.
 * @param {String} password The plain password to hash.
 * @return {String} The hashed password.
 */
export const bcryptHash = (password) => {
  if (!password) throw new Error('password is a required parameter.');

  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

/**
 * Check if a plain text password matches a hash.
 * @param {String} textPassword The user input password.
 * @param {String} hashedPassword The hashed password.
 * @returns {Boolean} Truthy or falsy values representing if the password is correct or not.
 */
export const bcryptCompare = (textPassword, hashedPassword) => {
  if (!textPassword || !hashedPassword) {
    throw new Error('textPassword and hashedPassword are required paramters.');
  }

  return bcrypt.compareSync(textPassword, hashedPassword);
};
