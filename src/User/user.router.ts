import { Router } from 'express';
import { userController } from './user.controller';
import { authMiddleware } from '../middlewares/auth-middleware';

const router = Router();

router.post("/user/registration", userController.registration);
router.get('/user/me', authMiddleware, userController.me);

export default router;