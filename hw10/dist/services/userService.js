"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const repositories_1 = require("../repositories");
const config_1 = require("../config/config");
class UserService {
    async createUser(body) {
        const { password } = body;
        const hashedPassword = await this._hashPassword(password);
        const userToSave = { ...body, hashedPassword };
        return repositories_1.userRepository.createUser(userToSave);
    }
    async getUserById(id) {
        return repositories_1.userRepository.getUserById(id);
    }
    async updateUser(id, obj) {
        if (obj.password) {
            obj.password = await this._hashPassword(obj.password);
        }
        return repositories_1.userRepository.updateUser(id, obj);
    }
    async getUserByEmail(email) {
        return repositories_1.userRepository.getUserByEmail(email);
    }
    async putchUser(id, email, password) {
        return repositories_1.userRepository.putchUser(id, email, password);
    }
    async compareUserPassword(password, hash) {
        const isPasswordUnique = bcrypt_1.default.compare(password, hash);
        if (!isPasswordUnique) {
            throw new Error('User not exist');
        }
    }
    async _hashPassword(password) {
        return bcrypt_1.default.hash(password, Number(config_1.config.USER_SALT_ROUNDS));
    }
}
exports.userService = new UserService();
//# sourceMappingURL=userService.js.map