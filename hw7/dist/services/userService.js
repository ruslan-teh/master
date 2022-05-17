"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const userRepository_1 = require("../repositories/user/userRepository");
const config_1 = require("../config/config");
class UserService {
    async createUser(user) {
        const { password } = user;
        const hashedPassword = await this._hashPasword(password);
        const userToSave = { ...user, password: hashedPassword };
        return userRepository_1.userRepository.createUser(userToSave);
    }
    async getAllUsers() {
        return userRepository_1.userRepository.getAllUsers();
    }
    async getUserById(id) {
        return userRepository_1.userRepository.getUserById(id);
    }
    async getUserByEmail(email) {
        try {
            return userRepository_1.userRepository.getUserByEmail(email);
        }
        catch (e) {
            throw new Error(`${e}`);
        }
    }
    async patcUser(id, email, password) {
        try {
            return userRepository_1.userRepository.pathUser(id, email, password);
        }
        catch (e) {
            throw new Error();
        }
    }
    async deleteUser(id) {
        try {
            return userRepository_1.userRepository.deleteUser(id);
        }
        catch (e) {
            throw new Error();
        }
    }
    _hashPasword(password) {
        return bcrypt_1.default.hash(password, Number(config_1.config.USER_SALT_ROUNDS));
    }
}
exports.userService = new UserService();
//# sourceMappingURL=userService.js.map