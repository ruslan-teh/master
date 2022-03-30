"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const services_1 = require("../services");
const tokenRepository_1 = require("../repositories/token/tokenRepository");
const constans_1 = require("../constans");
class AuthMiddleware {
    async checkAccessToken(req, res, next) {
        try {
            const accessToken = req.get(constans_1.constants.AUTORIZATION);
            if (!accessToken) {
                throw new Error('No token');
            }
            const { userEmail } = services_1.tokenService.verifyToken(accessToken);
            const tokenPairFromDB = await tokenRepository_1.tokenRepository.findByParams({ accessToken });
            if (!tokenPairFromDB) {
                throw new Error('Token not valid');
            }
            const userFromToken = await services_1.userService.getUserByEmail(userEmail);
            if (!userFromToken) {
                throw new Error('Token not valid');
            }
            req.user = userFromToken;
            next();
        }
        catch (e) {
            res.status(401)
                .json({
                status: 401,
                message: e.message,
            });
        }
    }
    async checkRefreshToken(req, res, next) {
        try {
            const refreshToken = req.get(constans_1.constants.AUTORIZATION);
            if (!refreshToken) {
                throw new Error('No token');
            }
            const { userEmail } = services_1.tokenService.verifyToken(refreshToken, 'refresh');
            // @ts-ignore
            const tokenPairFromDB = await tokenRepository_1.tokenRepository.findByParams({ refreshToken });
            if (!tokenPairFromDB) {
                throw new Error('Token not valid');
            }
            const userFromToken = await services_1.userService.getUserByEmail(userEmail);
            if (!userFromToken) {
                throw new Error('Token not valid');
            }
            req.user = userFromToken;
            next();
        }
        catch (e) {
            res.status(401).json({
                status: 401,
                message: e.message,
            });
        }
    }
}
exports.authMiddleware = new AuthMiddleware();
//# sourceMappingURL=authMiddleware.js.map