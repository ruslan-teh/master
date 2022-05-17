import { Router } from 'express';

import { authController } from '../controller/authController';
import { authMiddleware, userMiddleware } from '../middleware';

const router = Router();

router.post('/registration', authController.registration);
router.post('/login', userMiddleware.checkIsUserExist, authController.login);
router.post('/logout', authMiddleware.checkAccessToken, authController.logout);

export const authRouter = router;
