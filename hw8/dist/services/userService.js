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
    async createUser(user) {
        const { password } = user;
        const hashedPassword = await this._hashPasword(password);
        const userToSave = { ...user, password: hashedPassword };
        return repositories_1.userRepository.createUser(userToSave);
    }
    async getAllUsers() {
        return repositories_1.userRepository.getAllUsers();
    }
    async getUserById(id) {
        return repositories_1.userRepository.getUserById(id);
    }
    async getUserByEmail(email) {
        try {
            return repositories_1.userRepository.getUserByEmail(email);
        }
        catch (e) {
            throw new Error(`${e}`);
        }
    }
    async compareUserPasswords(password, hash) {
        const isPasswordUnique = bcrypt_1.default.compare(password, hash);
        if (!isPasswordUnique) {
            throw new Error('Invalid login or password!');
        }
    }
    async patcUser(id, email, password) {
        try {
            return repositories_1.userRepository.pathUser(id, email, password);
        }
        catch (e) {
            throw new Error();
        }
    }
    async deleteUser(id) {
        try {
            return repositories_1.userRepository.deleteUser(id);
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