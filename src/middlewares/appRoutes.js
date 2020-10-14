import { Router } from 'express';
import { NotFound } from '../libs/errors';

const router = Router();

// Add routes for other resources here.

router.all('*', () => {
  throw new NotFound('API endpoint does not exist.');
});

export default router;
