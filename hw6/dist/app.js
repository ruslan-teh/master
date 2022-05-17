"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
// import { User, Post, Comment } from './entity';
const apiRouter_1 = require("./router/apiRouter");
const config_1 = require("./config/config");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(apiRouter_1.apiRouter);
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
const { PORT } = config_1.config;
app.listen(PORT, async () => {
    console.log(`Server has started on Port:${PORT} `);
    try {
        const connection = await (0, typeorm_1.createConnection)();
        if (connection) {
            console.log('Database connected');
        }
    }
    catch (err) {
        if (err)
            console.log(err);
    }
});
//# sourceMappingURL=app.js.map