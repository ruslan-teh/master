import { Router } from 'express';
import { authController } from '../controller/authController';
import {authMiddleware} from "../middleware";

const router = Router();

router.post('/registration', authController.registration);
router.post('/logout', authMiddleware.checkAccessToken, authController.logout);

export const authRouter = router;
