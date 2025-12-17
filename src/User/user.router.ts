import { Router } from 'express'
import { userController } from './user.controller'

const router = Router()

router.post("/user/registration", userController.registration)
router.patch("/user/:id", userController.updateUser)
export default router