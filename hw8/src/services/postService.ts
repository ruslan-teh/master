import { UpdateResult } from 'typeorm';
import { IPost } from '../entity';
import { postRepositorie } from '../repositories';

class PostService {
    public async createPost(post:IPost):Promise<IPost> {
        return postRepositorie.createPost(post);
    }

    public async getPostByUser(id:number):Promise<IPost[]> {
        return postRepositorie.getUserPost(id);
    }

    public async updatePost(id:number, text:string, title:string):Promise<UpdateResult> {
        return postRepositorie.updatePost(id, title, text);
    }
}

export const postService = new PostService();
