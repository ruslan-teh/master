"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postController = void 0;
const services_1 = require("../services");
class PostController {
    async createPost(req, res) {
        try {
            const post = await services_1.postService.createPost(req.body);
            return res.json(post);
        }
        catch (e) {
            throw new Error();
        }
    }
    async getPostByUser(req, res) {
        try {
            const { id } = req.params;
            const getPostByUser = await services_1.postService.getPostByUser(+id);
            return res.json(getPostByUser);
        }
        catch (e) {
            throw new Error();
        }
    }
    async updatePost(req, res) {
        const { text, title } = req.body;
        const { id } = req.params;
        const updatePost = await services_1.postService.updatePost(+id, text, title);
        return res.json(updatePost);
    }
}
exports.postController = new PostController();
//# sourceMappingURL=postController.js.map