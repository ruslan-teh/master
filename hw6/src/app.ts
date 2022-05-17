import 'reflect-metadata';
import express from 'express';
import { createConnection } from 'typeorm';

// import { User, Post, Comment } from './entity';
import { apiRouter } from './router/apiRouter';
import { config } from './config/config';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(apiRouter);

// app.get('/comments/:userId', async (req: Request, res: Response) => {
//     try {
//         const comments = await getManager().getRepository(Comment)
//             .createQueryBuilder('comment')
//             .where('comment.authorId = :id', { id: +req.params.userId })
//             .leftJoinAndSelect('comment.user', 'user')
//             .leftJoinAndSelect('comment.post', 'post')
//             .getMany();
//         res.json(comments);
//     } catch (e) {
//         console.log(e);
//     }
// });
//
// app.post('/comments/action', async (req: Request, res: Response) => {
//     try {
//         const { action, commentId } = req.body;
//         const queryRunner = getManager().getRepository(Comment);
//         const comment = await queryRunner.createQueryBuilder('comment')
//             .where('comment.id = :id', { id: commentId })
//             .getOne();
//
//         if (!comment) {
//             throw new Error('wrong comment ID');
//         }
//
//         if (action === 'like') {
//             await queryRunner.update({ id: commentId }, { like: comment.like + 1 });
//         }
//         if (action === 'dislike') {
//             await queryRunner.update({ id: commentId }, { dislike: comment.dislike + 1 });
//         }
//
//         res.sendStatus(201);
//     } catch (e) {
//         console.log(e);
//     }
// });

const { PORT } = config;

app.listen(PORT, async () => {
    console.log(`Server has started on Port:${PORT} `);
    try {
        const connection = await createConnection();
        if (connection) {
            console.log('Database connected');
        }
    } catch (err) {
        if (err) console.log(err);
    }
});
