"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const userService_1 = require("../services/userService");
class UserController {
    async createUser(req, res) {
        const createdUser = await userService_1.userService.createUser(req.body);
        return res.json(createdUser);
    }
    async getUserById(req, res) {
        const { id } = req.params;
        const userFromDb = await userService_1.userService.getUserById(+id);
        return res.json(userFromDb);
    }
    async getUserByEmail(req, res) {
        const { email } = req.body;
        console.log(email);
        const userFromDB = await userService_1.userService.getUserByEmail(email);
        return res.json(userFromDB);
    }
    async putchUser(req, res) {
        const { id } = req.params;
        const { email, password } = req.body;
        const updateUser = await userService_1.userService.putchUser(+id, email, password);
        return res.json(updateUser);
    }
}
exports.userController = new UserController();
//# sourceMappingURL=userController.js.map