"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postService = void 0;
const repositories_1 = require("../repositories");
class PostService {
    async createPost(post) {
        return repositories_1.postRepositorie.createPost(post);
    }
    async getPostByUser(id) {
        return repositories_1.postRepositorie.getUserPost(id);
    }
    async updatePost(id, text, title) {
        return repositories_1.postRepositorie.updatePost(id, title, text);
    }
}
exports.postService = new PostService();
//# sourceMappingURL=postService.js.map