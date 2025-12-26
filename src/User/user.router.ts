import { Router } from 'express'
import { userController } from './user.controller'
import { authMiddleware } from '../middlewares/auth-middleware'

const router = Router();

router.post("/users/registration", userController.registration);
router.post("/users/login", authMiddleware, userController.login);
router.patch("/users/:id", userController.updateUser);
router.get('/users/me', authMiddleware ,authMiddleware, userController.me);
router.post('/users/addresses', authMiddleware, userController.createAdress);
router.delete("/users/addresses/:addressId",  userController.deleteAdress)
router.patch("/users/addresses/:addressId", userController.updateAdress)
router.get("/users/addresses", userController.getUserDeliveries)
router.get('/users/addresses/:addressId', userController.getUserDeliveryById)
router.get("/users/:userId/orders/", userController.getUserOrders)
router.post("/users/orders", authMiddleware, userController.createOrder)
router.post("/users/contact", authMiddleware, userController.sendContactMessage);

export default router;