import { Request, Response } from 'express';
import { UpdateResult } from 'typeorm';
import { IPost } from '../entity';
import { postService } from '../services';

class PostController {
    public async createPost(req:Request, res:Response):Promise<Response<IPost>> {
        try {
            const post = await postService.createPost(req.body);
            return res.json(post);
        } catch (e) {
            throw new Error();
        }
    }

    public async getPostByUser(req:Request, res:Response):Promise<Response<IPost>> {
        try {
            const { id } = req.params;
            const getPostByUser = await postService.getPostByUser(+id);
            return res.json(getPostByUser);
        } catch (e) {
            throw new Error();
        }
    }

    public async updatePost(req:Request, res:Response):Promise<Response<UpdateResult>> {
        const { text, title } = req.body;
        const { id } = req.params;
        const updatePost = await postService.updatePost(+id, text, title);
        return res.json(updatePost);
    }
}

export const postController = new PostController();
