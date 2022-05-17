"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const services_1 = require("../services");
const repositories_1 = require("../repositories");
const actionYokenRepositories_1 = require("../repositories/actionToken/actionYokenRepositories");
const actionTokenTypes_enums_1 = require("../enums/actionTokenTypes.enums");
const constants_1 = require("../constants");
class AuthController {
    async registration(req, res) {
        const data = await services_1.authService.registration(req.body);
        return res.json(data);
    }
    async logout(req, res) {
        const { id } = req.user;
        await services_1.tokenService.deleteUserTokenPair(id);
        return res.json('user logout');
    }
    async login(req, res) {
        try {
            const { id, email, password: hashPassword } = req.user;
            const { password } = req.body;
            await services_1.userService.compareUserPassword(password, hashPassword);
            const { accessToken, refreshToken } = services_1.tokenService.generateTokenPair({ userId: id, email });
            await repositories_1.tokenRepositories.createToken({ userId: id, refreshToken, accessToken });
            res.json({
                refreshToken,
                accessToken,
                user: req.user,
            });
        }
        catch (e) {
            res.status(400).json(e);
        }
    }
    async refreshToken(req, res) {
        try {
            const { id, email } = req.user;
            const refreshTokenToDelete = req.get('Authorization');
            await services_1.tokenService.deleteTokenPairByParams({ refreshToken: refreshTokenToDelete });
            const { accessToken, refreshToken } = await services_1.tokenService.generateTokenPair({ userId: id, email });
            await repositories_1.tokenRepositories.createToken({ userId: id, refreshToken, accessToken });
            res.json({
                accessToken,
                refreshToken,
                user: req.user,
            });
        }
        catch (e) {
            res.status(400).json(e);
        }
    }
    async sendForgotPassword(req, res, next) {
        try {
            const { id, email, firstName } = req.user;
            const token = services_1.tokenService.generateActionToken({ userId: id, email });
            await actionYokenRepositories_1.actionTokenRepositories.createActionToken({ actionToken: token, type: actionTokenTypes_enums_1.ActionTokenTypes.forgotPassword, userId: id });
            await services_1.emailService.sendMail(email, constants_1.emailActionEnum.ACCOUNT_BLOCKED, {
                token,
                userName: firstName,
            });
            res.sendStatus(204);
        }
        catch (e) {
            next(e);
        }
    }
    async setPassword(req, res, next) {
        try {
            const { id } = req.user;
            const actionToken = req.get(constants_1.constants.AUTHORIZATION);
            await services_1.userService.updateUser(id, req.body);
            await actionYokenRepositories_1.actionTokenRepositories.deleteByParams({ actionToken });
            res.sendStatus(201);
        }
        catch (e) {
            next(e);
        }
    }
}
exports.authController = new AuthController();
//# sourceMappingURL=authController.js.map