import { Router } from 'express';
import { postController } from '../controller';

const router = Router();

router.post('/', postController.createPost);
router.get('/posts/:userId', postController.getPostByUser);
router.patch('/posts/:postId', postController.updatePost);

export const postRouter = router;
