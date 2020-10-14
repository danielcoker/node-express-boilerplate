import mongoose from 'mongoose';
import logger from './logger';
import { getConnectionUrl, getDefaultConnectionOptions } from './mongodb';

mongoose.connect(getConnectionUrl(), getDefaultConnectionOptions(), (err) => {
  if (err) throw err;
  logger.info('Connected with Mongoose');
});
