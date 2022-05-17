import { Request, Response } from 'express';

import { UpdateResult } from 'typeorm';
import { IComment } from '../entity';
import { commentService } from '../services';

class CommentController {
    public async createComment(req:Request, res:Response):Promise<Response<IComment>> {
        const createComment = await commentService.createComment(req.body);
        return res.json(createComment);
    }

    public async getUserComment(req:Request, res:Response):Promise<Response<IComment>> {
        const { id } = req.params;
        const userComment = await commentService.getUserComment(+id);
        return res.json(userComment);
    }

    public async setLikeDislike(req: Request): Promise<UpdateResult | undefined> {
        const { action, commentId } = req.body;
        return commentService.setLikeDislike(action, commentId);
    }
}

export const commentController = new CommentController();
