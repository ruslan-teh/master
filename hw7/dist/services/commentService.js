"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentService = void 0;
const commentRepository_1 = require("../repositories/comment/commentRepository");
class CommentService {
    async createComment(comment) {
        return commentRepository_1.commentRepository.createComment(comment);
    }
    async getUserComment(id) {
        return commentRepository_1.commentRepository.getUserComment(id);
    }
    async setLikeDislike(action, commentId) {
        const queryRunner = await commentRepository_1.commentRepository.getQueryRunner();
        const comment = await commentRepository_1.commentRepository.getComment(queryRunner, commentId);
        if (!comment) {
            throw new Error('wrong comment ID');
        }
        if (action === 'like') {
            return commentRepository_1.commentRepository.setLike(queryRunner, comment, commentId);
        }
        if (action === 'dislike') {
            return commentRepository_1.commentRepository.setDislike(queryRunner, comment, commentId);
        }
    }
}
exports.commentService = new CommentService();
//# sourceMappingURL=commentService.js.map