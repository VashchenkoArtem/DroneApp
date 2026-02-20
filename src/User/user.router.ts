import { Router } from 'express'
import { userController } from './user.controller'
import { authMiddleware } from '../middlewares/auth-middleware'

const router = Router();

router.post("/users/registration", userController.registration);
router.post("/users/login", userController.login);
router.patch("/users/update",authMiddleware, userController.updateUser);
router.get('/users/me', authMiddleware ,authMiddleware, userController.me);
router.post('/users/addresses', authMiddleware, userController.createAdress);
router.delete("/users/addresses/:addressId", userController.deleteAdress);
router.patch("/users/addresses/:addressId", userController.updateAdress);
router.get("/users/addresses/:userId", userController.getUserDeliveries);
router.get('/users/addresses/single/:addressId', userController.getUserDeliveryById);
router.get("/users/orders/:email", authMiddleware, userController.getUserOrders);
router.post("/users/orders", authMiddleware, userController.createOrder)
router.post("/users/contacts", userController.sendContactMessage);
router.post("/users/send-code", userController.sendCodeToEmail);
router.post("/users/recovery-password", userController.checkAndResetPassword);

export default router;