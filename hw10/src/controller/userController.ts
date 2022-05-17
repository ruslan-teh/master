import { Request, Response } from 'express';

import { UpdateResult } from 'typeorm';
import { IUser } from '../entity';
import { userService } from '../services/userService';

class UserController {
    public async createUser(req: Request, res: Response): Promise<Response<IUser>> {
        const createdUser = await userService.createUser(req.body);
        return res.json(createdUser);
    }

    public async getUserById(req: Request, res: Response): Promise<Response<IUser | undefined>> {
        const { id } = req.params;
        const userFromDb = await userService.getUserById(+id);
        return res.json(userFromDb);
    }

    public async getUserByEmail(req: Request, res: Response): Promise<Response<IUser | undefined>> {
        const { email } = req.body;
        console.log(email);
        const userFromDB = await userService.getUserByEmail(email);
        return res.json(userFromDB);
    }

    public async putchUser(req: Request, res: Response): Promise<Response<UpdateResult | undefined>> {
        const { id } = req.params;
        const { email, password } = req.body;
        const updateUser = await userService.putchUser(+id, email, password);
        return res.json(updateUser);
    }
}

export const userController = new UserController();
