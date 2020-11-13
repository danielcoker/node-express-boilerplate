import { Router } from 'express';
import * as userController from './users.controller';
import { validateBody, authWithBearerToken } from '../../middlewares';

const router = Router();

router.route('/').get(authWithBearerToken(), userController.getUser);
router.route('/auth/login').post(validateBody('UserSchemas', 'loginSchema'), userController.login);
router
  .route('/auth/register')
  .post(validateBody('UserSchemas', 'registerSchema'), userController.register);

export default router;
