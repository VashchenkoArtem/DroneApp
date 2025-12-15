import { Router } from 'express'
import { userController } from './user.controller'

const router = Router()

router.post("/user/registration", userController.registration)

export default router