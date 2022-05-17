"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentController = void 0;
const services_1 = require("../services");
class CommentController {
    async createComment(req, res) {
        const createComment = await services_1.commentService.createComment(req.body);
        return res.json(createComment);
    }
    async getUserComment(req, res) {
        const { id } = req.params;
        const userComment = await services_1.commentService.getUserComment(+id);
        return res.json(userComment);
    }
    async setLikeDislike(req) {
        const { action, commentId } = req.body;
        return services_1.commentService.setLikeDislike(action, commentId);
    }
}
exports.commentController = new CommentController();
//# sourceMappingURL=commentController.js.map