/* eslint-disable global-require */
// Register babel hook so we can write the real entry file (server.js) in ES6
if (process.env.NODE_ENV !== 'production') {
  require('@babel/register');
}

const setupNconf = require('./libs/setupNconf');

// Initialize configuration BEFORE anything.
setupNconf();

module.exports = require('./server.js');
