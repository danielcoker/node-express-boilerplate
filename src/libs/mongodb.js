import nconf from 'nconf';

const NODE_ENV = nconf.get('NODE_ENV')?.trim();

/**
 * Get connection URL depending on the NODE_ENV.
 * @returns {String} The connection URL.
 */
export const getConnectionUrl = () => {
  let connectionUrl;

  switch (NODE_ENV) {
    case 'production':
      connectionUrl = nconf.get('DB_PROD_URL');
      break;
    case 'development':
      connectionUrl = nconf.get('DB_DEV_URL');
      break;
    case 'test':
      connectionUrl = nconf.get('DB_TEST_URL');
      break;
    default:
      connectionUrl = nconf.get('DB_DEV_URL');
  }

  return connectionUrl;
};

/**
 * Create the mongoose connection object.
 * @returns {Object} The connection options object.
 */
export const getDefaultConnectionOptions = () => ({
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
