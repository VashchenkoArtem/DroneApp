import { Router } from 'express'
import { userController } from './user.controller'
import { authMiddleware } from '../middlewares/auth-middleware'

const router = Router();

router.post("/user/registration", userController.registration);
router.post("/user/login", authMiddleware ,authMiddleware, userController.login);
router.patch("/user/:id", userController.updateUser);
router.get('/user/me', authMiddleware ,authMiddleware, userController.me);
router.post('/user/createAdress', authMiddleware, userController.createAdress);
router.delete("/user/adress/:adressId", userController.deleteAdress)
router.patch("/user/adress/:adressId", userController.updateAdress)

export default router;