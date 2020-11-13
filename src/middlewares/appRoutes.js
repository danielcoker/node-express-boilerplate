import { Router } from 'express';
import { NotFound } from '../libs/errors';

import { userRoutes } from '../resources/users';

const router = Router();

router.use('/users', userRoutes);

router.all('*', () => {
  throw new NotFound('API endpoint does not exist.');
});

export default router;
