const dotenv = require('dotenv');
const nconfDefault = require('nconf');

/**
 * Setup nconf for environment config.
 * @param {Function} nconfInstance A instance of nconf.
 * @return {void}
 */
module.exports = function setupNconf(nconfInstance = nconfDefault) {
  dotenv.config();
  nconfInstance.argv().env();

  nconfInstance.defaults({
    IS_PROD: nconfInstance.get('NODE_ENV') === 'production',
    IS_DEV: nconfInstance.get('NODE_ENV') === 'development',
    IS_TEST: nconfInstance.get('NODE_ENV') === 'test',
  });
};
