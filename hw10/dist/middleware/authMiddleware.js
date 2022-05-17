"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const services_1 = require("../services");
const constants_1 = require("../constants");
const repositories_1 = require("../repositories");
const userValidator_1 = require("../validators/userValidator");
const ErrorHandler_1 = require("../error/ErrorHandler");
const actionYokenRepositories_1 = require("../repositories/actionToken/actionYokenRepositories");
class AuthMiddleware {
    async checkAccessToken(req, res, next) {
        try {
            const authToken = req.get(constants_1.constants.AUTHORIZATION);
            if (!authToken) {
                throw new Error('no token');
            }
            const { email } = services_1.tokenService.verifyToken(authToken);
            const userFromToken = await services_1.userService.getUserByEmail(email);
            if (!userFromToken) {
                throw new Error('wrong token');
            }
            req.user = userFromToken;
            next();
        }
        catch (e) {
            res.json({
                status: 400,
                massage: e.message,
            });
        }
    }
    async checkRefreshToken(req, res, next) {
        try {
            const refreshToken = req.get(constants_1.constants.AUTHORIZATION);
            if (!refreshToken) {
                throw new Error('no token');
            }
            const { email } = services_1.tokenService.verifyToken(refreshToken, 'refresh');
            const tokenPairFromDB = repositories_1.tokenRepositories.findByParams({ refreshToken });
            if (!tokenPairFromDB) {
                throw new Error('token not valid');
            }
            const userFromToken = await services_1.userService.getUserByEmail(email);
            if (!userFromToken) {
                throw new Error('token not valid');
            }
            req.user = userFromToken;
            next();
        }
        catch (e) {
            res.json({
                status: 400,
                massage: e.message,
            });
        }
    }
    async checkActionToken(req, res, next) {
        try {
            const actionToken = req.get(constants_1.constants.AUTHORIZATION);
            if (!actionToken) {
                next(new ErrorHandler_1.ErrorHandler('No Token'));
                return;
            }
            const { email } = services_1.tokenService.verifyToken(actionToken, 'action');
            const tokenFromDB = await actionYokenRepositories_1.actionTokenRepositories.findByParams({ actionToken });
            if (!tokenFromDB) {
                next(new ErrorHandler_1.ErrorHandler('Token not valid', 401));
                return;
            }
            const userFromToken = await services_1.userService.getUserByEmail(email);
            if (!userFromToken) {
                next(new ErrorHandler_1.ErrorHandler('Token not valid', 401));
                return;
            }
            req.user = userFromToken;
            next();
        }
        catch (e) {
            res.status(401).json({
                status: 401,
                message: e.massage,
            });
        }
    }
    // validations
    async isLoginValid(req, res, next) {
        try {
            const { error, value } = await userValidator_1.userValidator.login.validate(req.body);
            if (error) {
                next(new Error(error.details[0].message));
            }
            req.body = value;
        }
        catch (e) {
            next(e);
        }
    }
    checkValidEmail(req, res, next) {
        try {
            const { error, value } = userValidator_1.userValidator.email.validate(req.body);
            if (error) {
                next(new ErrorHandler_1.ErrorHandler(error.details[0].message));
                return;
            }
            req.body = value;
            next();
        }
        catch (e) {
            next(e);
        }
    }
    checkValidPass(req, res, next) {
        try {
            const { error, value } = userValidator_1.userValidator.password.validate(req.body);
            if (error) {
                next(new ErrorHandler_1.ErrorHandler(error.details[0].message));
                return;
            }
            req.body = value;
            next();
        }
        catch (e) {
            next(e);
        }
    }
}
exports.authMiddleware = new AuthMiddleware();
//# sourceMappingURL=authMiddleware.js.map