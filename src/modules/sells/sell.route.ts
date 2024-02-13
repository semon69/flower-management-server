import { Router } from 'express';
import validateRequest from '../../middleware/validateRequest';
import { sellController } from './sell.controller';
import { sellValidation } from './sell.validation';
import auth, { USER_ROLE } from '../../middleware/Auth';

const router = Router();

router.post(
  '/create-sell',
  auth(USER_ROLE.seller),
  validateRequest(sellValidation),
  sellController.createsell,
);

router.get('/sells', sellController.getAllSells);

export const SellRoutes = router;
