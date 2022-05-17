import { UpdateResult } from 'typeorm';
import { IComment } from '../entity';
import { commentRepository } from '../repositories/comment/commentRepository';

class CommentService {
    public async createComment(comment:IComment) {
        return commentRepository.createComment(comment);
    }

    public async getUserComment(id:number):Promise<IComment[]> {
        return commentRepository.getUserComment(id);
    }

    public async setLikeDislike(action: string, commentId: number)
        : Promise<UpdateResult | undefined> {
        const queryRunner = await commentRepository.getQueryRunner();
        const comment = await commentRepository.getComment(queryRunner, commentId);

        if (!comment) {
            throw new Error('wrong comment ID');
        }

        if (action === 'like') {
            return commentRepository.setLike(queryRunner, comment, commentId);
        }
        if (action === 'dislike') {
            return commentRepository.setDislike(queryRunner, comment, commentId);
        }
    }
}

export const commentService = new CommentService();
