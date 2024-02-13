import { Router } from "express"
import validateRequest from "../../middleware/validateRequest"
import { flowerValidation, updateFlowerValidation } from "./flower.validation"
import { flowerController } from "./flower.controller"
import auth from "../../middleware/Auth"

const router = Router()

router.post('/create-flower', auth('user'), validateRequest(flowerValidation), flowerController.createFlower)

router.get('/flowers', flowerController.getAllFlowers)

router.patch('/update-flower/:_id', auth('user'), validateRequest(updateFlowerValidation), flowerController.updateFlower)

router.delete('/delete-flower/:_id', auth('user'), flowerController.deleteFlower)

router.delete('/delete-multiple-flower', auth('user'), flowerController.deleteMultipleFlower)

export const FlowerRoutes = router