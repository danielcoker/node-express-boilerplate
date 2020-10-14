import express from 'express';
import nconf from 'nconf';
import morgan from 'morgan';

import validateBody from './validateBody';

import appRoutes from './appRoutes';
import errorHandler from './errorHandler';

import responseHandler from './response';

const attachMiddlewares = (app) => {
  if (nconf.get('IS_DEV')) app.use(morgan('dev'));

  app.use(express.json());

  // Add res.respond
  app.use(responseHandler);

  app.use('/api/v1', appRoutes);

  // Error handler middleware.
  app.use(errorHandler);
};

export { validateBody };

export default attachMiddlewares;
