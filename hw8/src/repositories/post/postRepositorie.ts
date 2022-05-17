import {
    EntityRepository, getManager, Repository, UpdateResult,
} from 'typeorm';
import { IPost, Post } from '../../entity';
import { IPostRepositorie } from './postRepositorie.interface';

@EntityRepository(Post)
class PostRepositorie extends Repository<Post> implements IPostRepositorie {
    public async createPost(post:IPost):Promise<IPost> {
        return getManager().getRepository(Post).save(post);
    }

    getUserPost(id: number): Promise<IPost[]> {
        return getManager().getRepository(Post)
            .createQueryBuilder('post')
            .where('post.userId = :id', { id })
            .leftJoin('User', 'userId = post.userId')
            .getMany();
    }

    updatePost(id: number, title: string, text: string): Promise<UpdateResult> {
        return getManager().getRepository(Post)
            .update({ id }, { title, text });
    }
}

export const postRepositorie = new PostRepositorie();
