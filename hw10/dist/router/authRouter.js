"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const controller_1 = require("../controller");
const middleware_1 = require("../middleware");
const router = (0, express_1.Router)();
router.post('/registration', controller_1.authController.registration);
router.post('/login', middleware_1.authMiddleware.isLoginValid, middleware_1.userMiddleware.checkIsUserExist, controller_1.authController.login);
router.post('/logout', middleware_1.authMiddleware.checkAccessToken, controller_1.authController.logout);
router.post('/refresh', middleware_1.authMiddleware.checkRefreshToken, controller_1.authController.refreshToken);
router.post('/forgotPassword', middleware_1.authMiddleware.checkValidEmail, middleware_1.userMiddleware.checkIsUserExist, controller_1.authController.sendForgotPassword);
router.post('/forgotPassword/set', middleware_1.authMiddleware.checkValidPass, middleware_1.authMiddleware.checkActionToken, controller_1.authController.setPassword);
exports.authRouter = router;
//# sourceMappingURL=authRouter.js.map