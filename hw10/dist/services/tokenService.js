"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
const repositories_1 = require("../repositories");
class TokenService {
    generateTokenPair(payload) {
        const accessToken = jsonwebtoken_1.default.sign(payload, config_1.config.SECRET_ACCESS_KEY, { expiresIn: config_1.config.EXPIRES_IN_ACCESS });
        const refreshToken = jsonwebtoken_1.default.sign(payload, config_1.config.SECRET_REFRESH_KEY, { expiresIn: config_1.config.EXPIRES_IN_REFRESH });
        return {
            accessToken,
            refreshToken,
        };
    }
    async saveToken(userId, accessToken, refreshToken) {
        const tokenFromDB = await repositories_1.tokenRepositories.findTokenByUserId(userId);
        if (tokenFromDB) {
            tokenFromDB.refreshToken = refreshToken;
            tokenFromDB.accessToken = accessToken;
            return repositories_1.tokenRepositories.createToken(tokenFromDB);
        }
        return repositories_1.tokenRepositories.createToken({ accessToken, refreshToken, userId });
    }
    async deleteUserTokenPair(userId) {
        return repositories_1.tokenRepositories.deleteByParams({ userId });
    }
    verifyToken(authToken, tokenType = 'access') {
        let secretWord = config_1.config.SECRET_ACCESS_KEY;
        if (tokenType = 'refresh') {
            secretWord = config_1.config.SECRET_REFRESH_KEY;
        }
        if (tokenType === 'action') {
            secretWord = config_1.config.SECRET_ACTION_KEY;
        }
        return jsonwebtoken_1.default.verify(authToken, secretWord);
    }
    generateActionToken(payload) {
        return jsonwebtoken_1.default.sign(payload, config_1.config.SECRET_ACTION_KEY, { expiresIn: config_1.config.EXPIRES_IN_ACTION });
    }
    async deleteTokenPairByParams(searchObject) {
        return repositories_1.tokenRepositories.deleteByParams(searchObject);
    }
}
exports.tokenService = new TokenService();
//# sourceMappingURL=tokenService.js.map