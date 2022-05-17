import { Router } from 'express';
import { authController } from '../controller/authController';

const router = Router();

router.post('/registration', authController.registration);
router.post('/logout', authController.logout);

export const authRouter = router;
