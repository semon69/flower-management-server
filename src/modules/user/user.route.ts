import { Router } from 'express';
import validateRequest from '../../middleware/validateRequest';
import { loginValidation, refreshTokenValidation, userValidation } from './user.validation';
import { userController } from './user.controller';
import auth, { USER_ROLE } from '../../middleware/Auth';

const router = Router();

router.get('/users', userController.totalUsers)

router.patch('/user/:id', auth(USER_ROLE.manager), userController.updateRole)

router.post(
  '/register',
  validateRequest(userValidation),
  userController.registerUser,
);
router.post(
  '/login',
  validateRequest(loginValidation),
  userController.userLogin,
);
router.post(
  '/refresh-token',
  validateRequest(refreshTokenValidation),
  userController.refreshToken,
);

export const UserRoutes = router;
