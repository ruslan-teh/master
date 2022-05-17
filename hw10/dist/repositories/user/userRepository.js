"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepository = void 0;
const typeorm_1 = require("typeorm");
const entity_1 = require("../../entity");
class UserRepository {
    async createUser(user) {
        return (0, typeorm_1.getManager)().getRepository(entity_1.User).save(user);
    }
    async updateUser(id, user) {
        return (0, typeorm_1.getManager)().getRepository(entity_1.User).update({ id }, user);
    }
    async getUserById(id) {
        return (0, typeorm_1.getManager)().getRepository(entity_1.User)
            .createQueryBuilder('user')
            .where('user.id = :id', { id })
            .getOne();
    }
    async getUserByEmail(email) {
        return (0, typeorm_1.getManager)().getRepository(entity_1.User)
            .createQueryBuilder('user')
            .where('user.email = :email', { email })
            .getOne();
    }
    async putchUser(id, email, password) {
        return (0, typeorm_1.getManager)().getRepository(entity_1.User).update({ id }, { email, password });
    }
}
exports.userRepository = new UserRepository();
//# sourceMappingURL=userRepository.js.map