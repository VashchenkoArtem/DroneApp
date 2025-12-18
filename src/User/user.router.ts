import { Router } from 'express'
import { userController } from './user.controller'
import { authMiddleware } from '../middlewares/auth-middleware'

const router = Router()

router.post("/user/registration", userController.registration)
router.post("/user/login", authMiddleware, userController.login)
router.patch("/user/:id", userController.updateUser)

export default router