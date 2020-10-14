import nconf from 'nconf';
import { configure, getLogger } from 'log4js';

configure({
  appenders: {
    console: { type: 'stdout', layout: { type: 'colored' } },
  },
  categories: {
    default: { appenders: ['console'], level: nconf.get('LOG_LEVEL') },
  },
});

export default getLogger();
