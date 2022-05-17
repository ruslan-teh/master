"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleware = void 0;
const repositories_1 = require("../repositories");
class UserMiddleware {
    async checkIsUserExist(req, res, next) {
        try {
            const userFromDB = await repositories_1.userRepository.getUserByEmail(req.body.email);
            if (!userFromDB) {
                res.status(400).json('user not found');
                return;
            }
            req.user = userFromDB;
            next();
        }
        catch (e) {
            res.status(400).json(e);
        }
    }
}
exports.userMiddleware = new UserMiddleware();
//# sourceMappingURL=userMiddleware.js.map