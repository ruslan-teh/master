import { Router } from 'express';
import { userController } from '../controller';

const router = Router();

router.post('/', userController.createUser);
router.get('/:id', userController.getUserById);
router.get('/', userController.getAllUsers);
router.get('/email/:email', userController.getUserByEmail);
router.patch('/:id', userController.pathUser);
router.delete('/:id', userController.deleteUser);

export const userRouter = router;
