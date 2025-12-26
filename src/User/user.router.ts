import { Router } from 'express'
import { userController } from './user.controller'
import { authMiddleware } from '../middlewares/auth-middleware'

const router = Router();

router.post("/users/registration", userController.registration);
router.post("/users/login", authMiddleware, userController.login);
router.patch("/users/:id", userController.updateUser);
router.get('/users/me', authMiddleware ,authMiddleware, userController.me);
// router.post('/users/addresses', authMiddleware, userController.createAddress);
// router.delete("/users/addresses/:addressId",  userController.deleteAddress)
// router.patch("/users/addresses/:addressId", userController.updateAddress)
router.post("/users/contact", authMiddleware, userController.sendContactMessage);

export default router;