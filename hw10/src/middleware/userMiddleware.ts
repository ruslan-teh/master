import { NextFunction, Response } from 'express';

import { IRequestExtended } from '../interfaces';
import { userRepository } from '../repositories';

class UserMiddleware {
    public async checkIsUserExist(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const userFromDB = await userRepository.getUserByEmail(req.body.email);

            if (!userFromDB) {
                res.status(400).json('user not found');
                return;
            }
            req.user = userFromDB;

            next();
        } catch (e: any) {
            res.status(400).json(e);
        }
    }
}

export const userMiddleware = new UserMiddleware();
