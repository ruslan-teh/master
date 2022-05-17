import { Router } from 'express';

import { userController } from '../controller';

const router = Router();

router.post('/', userController.createUser);
router.get('/:id', userController.getUserById);
router.get('/', userController.getUserByEmail);
router.patch('/:id', userController.putchUser);

export const userRouter = router;
