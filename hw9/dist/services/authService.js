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
            throw new Error('user with email already exist');
        }
        const createUser = await userService_1.userService.createUser(body);
        return this._getTokenData(createUser);
    }
    async _getTokenData(userData) {
        const { id, email } = userData;
        const tokenPair = await tokenService_1.tokenService.generateTokenPair({ userId: id, userEmail: email });
        await tokenService_1.tokenService.saveToken(id, tokenPair.refreshToken, tokenPair.accessToken);
        return {
            ...tokenPair,
            userId: id,
            userEmail: email,
        };
    }
}
exports.authService = new AuthService();
//# sourceMappingURL=authService.js.map