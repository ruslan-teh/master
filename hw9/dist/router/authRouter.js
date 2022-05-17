"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const authController_1 = require("../controller/authController");
const middleware_1 = require("../middleware");
const router = (0, express_1.Router)();
router.post('/registration', authController_1.authController.registration);
router.post('/login', middleware_1.userMiddleware.checkIsUserExist, authController_1.authController.login);
router.post('/logout', middleware_1.authMiddleware.checkAccessToken, authController_1.authController.logout);
exports.authRouter = router;
//# sourceMappingURL=authRouter.js.map