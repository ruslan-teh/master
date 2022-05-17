"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRepositorie = void 0;
const typeorm_1 = require("typeorm");
const entity_1 = require("../../entity");
let PostRepositorie = class PostRepositorie extends typeorm_1.Repository {
    async createPost(post) {
        return (0, typeorm_1.getManager)().getRepository(entity_1.Post).save(post);
    }
    getUserPost(id) {
        return (0, typeorm_1.getManager)().getRepository(entity_1.Post)
            .createQueryBuilder('post')
            .where('post.userId = :id', { id })
            .leftJoin('User', 'userId = post.userId')
            .getMany();
    }
    updatePost(id, title, text) {
        return (0, typeorm_1.getManager)().getRepository(entity_1.Post)
            .update({ id }, { title, text });
    }
};
PostRepositorie = __decorate([
    (0, typeorm_1.EntityRepository)(entity_1.Post)
], PostRepositorie);
exports.postRepositorie = new PostRepositorie();
//# sourceMappingURL=postRepositorie.js.map