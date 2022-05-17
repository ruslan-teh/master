"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const services_1 = require("../services");
const constants_1 = require("../constants");
const tokenRepository_1 = require("../repositories/token/tokenRepository");
class AuthMiddleware {
    async checkAccessToken(req, res, next) {
        try {
            const authToken = req.get('Authorization');
            if (!authToken) {
                throw new Error('No token');
            }
            const { userEmail } = services_1.tokenService.verifyToken(authToken);
            const userFromToken = await services_1.userService.getUserByEmail(userEmail);
            if (!userFromToken) {
                throw new Error('Wrong Token');
            }
            req.user = userFromToken;
        }
        catch (e) {
            res.json({
                status: 400,
                message: e.message,
            });
        }
    }
    async checkRefreshToken(req, res, next) {
        try {
            const refreshToken = req.get(constants_1.constants.AUTHORIZATION);
            if (!refreshToken) {
                throw new Error('no Token');
            }
            const { userEmail } = services_1.tokenService.verifyToken(refreshToken, 'refresh');
            const tokenPairFromDB = await tokenRepository_1.tokenRepository.findByParams({ refreshToken });
            if (!tokenPairFromDB) {
                throw new Error('Token not valid');
            }
            const userFromToken = await services_1.userService.getUserByEmail(userEmail);
            if (!userFromToken) {
                throw new Error('token not valid');
            }
            req.user = userFromToken;
            next();
        }
        catch (e) {
            res.status(401).json({
                status: 401,
                massage: e.massage,
            });
        }
    }
}
exports.authMiddleware = new AuthMiddleware();
//# sourceMappingURL=authMiddleware.js.map