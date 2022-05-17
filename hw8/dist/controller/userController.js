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
        const userById = await userService_1.userService.getUserById(Number(id));
        return res.json(userById);
    }
    async getAllUsers(req, res) {
        const getAllUsers = await userService_1.userService.getAllUsers();
        return res.json(getAllUsers);
    }
    async getUserByEmail(req, res) {
        try {
            const { email } = req.params;
            const getUserByEmail = await userService_1.userService.getUserByEmail(email);
            return res.json(getUserByEmail);
        }
        catch (e) {
            throw new Error();
        }
    }
    async pathUser(req, res) {
        try {
            const { email, password } = req.body;
            const { id } = req.params;
            const pathUser = userService_1.userService.patcUser(Number(id), email, password);
            return res.json(pathUser);
        }
        catch (e) {
            throw new Error();
        }
    }
    async deleteUser(req, res) {
        try {
            const { id } = req.params;
            const deleteUser = userService_1.userService.deleteUser(+id);
            return res.json(deleteUser);
        }
        catch (e) {
            throw new Error();
        }
    }
}
exports.userController = new UserController();
//# sourceMappingURL=userController.js.map