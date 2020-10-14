import http from 'http';
import app from './app';

import logger from './libs/logger';

const server = http.createServer();

server.on('request', app);

server.listen(app.get('port'), () => {
  logger.info(`Express server listening on port ${app.get('port')}`);
});

export default server;
