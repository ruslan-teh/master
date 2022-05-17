import { Request, Response } from 'express';
import { DeleteResult, UpdateResult } from 'typeorm';
import { IUser } from '../entity';
import { userService } from '../services';

class UserController {
    public async createUser(req:Request, res:Response): Promise<Response<IUser>> {
        const createdUser = await userService.createUser(req.body);
        return res.json(createdUser);
    }

    public async getUserById(req:Request, res:Response): Promise<Response<IUser | undefined>> {
        const { id } = req.params;
        const userById = await userService.getUserById(Number(id));
        return res.json(userById);
    }

    public async getAllUsers(req:Request, res:Response):Promise<Response<IUser[] | undefined>> {
        const getAllUsers = await userService.getAllUsers();
        return res.json(getAllUsers);
    }

    public async getUserByEmail(req:Request, res:Response):Promise<Response<IUser | undefined>> {
        try {
            const { email } = req.params;
            const getUserByEmail = await userService.getUserByEmail(email);
            return res.json(getUserByEmail);
        } catch (e) {
            throw new Error();
        }
    }

    public async pathUser(req:Request, res:Response): Promise <Response<UpdateResult>> {
        try {
            const { email, password } = req.body;
            const { id } = req.params;
            const pathUser = await userService.patcUser(Number(id), email, password);
            return res.json(pathUser);
        } catch (e) {
            throw new Error();
        }
    }

    public async deleteUser(req:Request, res:Response):Promise<Response<DeleteResult>> {
        try {
            const { id } = req.params;
            const deleteUser = await userService.deleteUser(+id);
            return res.json(deleteUser);
        } catch (e) {
            throw new Error();
        }
    }
}

export const userController = new UserController();
