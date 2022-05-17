"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const userService_1 = require("./userService");
const tokenService_1 = require("./tokenService");
class AuthService {
    async registration(body) {
        const { email } = body;
        const userFromDB = await userService_1.userService.getUserByEmail(email);
        if (userFromDB) {
            throw new Error('user is exist');
        }
        const createdUser = await userService_1.userService.createUser(body);
        return this._getTokenData(createdUser);
    }
    async _getTokenData(userData) {
        const { id, email } = userData;
        const generateTokenPair = await tokenService_1.tokenService.generateTokenPair({ userId: id, email });
        await tokenService_1.tokenService.saveToken(id, generateTokenPair.accessToken, generateTokenPair.refreshToken);
        return {
            ...generateTokenPair,
            userId: id,
            email,
        };
    }
}
exports.authService = new AuthService();
//# sourceMappingURL=authService.js.map