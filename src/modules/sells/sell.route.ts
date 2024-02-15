import { Router } from 'express';
import validateRequest from '../../middleware/validateRequest';
import { sellController } from './sell.controller';
import { memberValidation, sellValidation } from './sell.validation';
import auth, { USER_ROLE } from '../../middleware/Auth';

const router = Router();

router.post(
  '/create-sell',
  auth(USER_ROLE.seller),
  validateRequest(sellValidation),
  sellController.createsell,
);

router.get('/sells', sellController.getAllSells);

router.post("/create-member", validateRequest(memberValidation), sellController.createMember)

router.get("/members", sellController.getMembers)
router.get("/member/:email", sellController.getSingleMember)

router.patch("/calculatePoints", sellController.calculatePoints)

export const SellRoutes = router;
