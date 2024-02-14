import { Router } from 'express';
import validateRequest from '../../middleware/validateRequest';
import {
  createCupon,
  flowerValidation,
  updateFlowerValidation,
} from './flower.validation';
import { flowerController } from './flower.controller';
import auth, { USER_ROLE } from '../../middleware/Auth';

const router = Router();

router.post(
  '/create-flower',
  auth(USER_ROLE.manager),
  validateRequest(flowerValidation),
  flowerController.createFlower,
);
router.post(
  '/create-cupon',
  auth(USER_ROLE.manager),
  validateRequest(createCupon),
  flowerController.createCupon,
);
router.get('/cupon/:cupon', flowerController.getSingleCupon);

router.get('/flowers', flowerController.getAllFlowers);

router.patch(
  '/update-flower/:_id',
  auth(USER_ROLE.manager),
  validateRequest(updateFlowerValidation),
  flowerController.updateFlower,
);

router.delete(
  '/delete-flower/:_id',
  auth(USER_ROLE.manager),
  flowerController.deleteFlower,
);

router.delete(
  '/delete-multiple-flower',
  auth(USER_ROLE.manager),
  flowerController.deleteMultipleFlower,
);

export const FlowerRoutes = router;
