import { Router } from 'express'
import { userController } from './user.controller'
import { authMiddleware } from '../middlewares/auth-middleware'

const router = Router();

router.post("/users/registration", userController.registration);
router.post("/users/login", authMiddleware, userController.login);
router.patch("/users/:id", userController.updateUser);
router.get('/users/me', authMiddleware ,authMiddleware, userController.me);
router.post('/users/address', authMiddleware, userController.createAdress);
router.delete("/users/address/:addressId", userController.deleteAdress)
router.patch("/users/address/:addressId", userController.updateAdress)


export default router;