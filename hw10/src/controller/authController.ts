import { NextFunction, Request, Response } from 'express';

import { IRequestExtended, ITokenData } from '../interfaces';
import {
    authService, emailService, tokenService, userService,
} from '../services';
import { IUser } from '../entity';
import { tokenRepositories } from '../repositories';
import { actionTokenRepositories } from '../repositories/actionToken/actionYokenRepository';
import { ActionTokenTypes } from '../enums/actionTokenTypes.enums';
import { constants, emailActionEnum } from '../constants';

class AuthController {
    public async registration(req: Request, res: Response):Promise<Response<ITokenData>> {
        const data = await authService.registration(req.body);
        return res.json(data);
    }

    public async logout(req: IRequestExtended, res: Response): Promise<Response<string>> {
        const { id } = req.user as IUser;

        await tokenService.deleteUserTokenPair(id);

        return res.json('user logout');
    }

    public async login(req: IRequestExtended, res: Response) {
        try {
            const { id, email, password: hashPassword } = req.user as IUser;
            const { password } = req.body;

            await userService.compareUserPassword(password, hashPassword);

            const { accessToken, refreshToken } = tokenService.generateTokenPair({ userId: id, email });

            await tokenRepositories.createToken({ userId: id, refreshToken, accessToken });

            res.json({
                refreshToken,
                accessToken,
                user: req.user,
            });
        } catch (e) {
            res.status(400).json(e);
        }
    }

    public async refreshToken(req: IRequestExtended, res: Response) {
        try {
            const { id, email } = req.user as IUser;

            const refreshTokenToDelete = req.get('Authorization');

            await tokenService.deleteTokenPairByParams({ refreshToken: refreshTokenToDelete });

            const { accessToken, refreshToken } = await tokenService.generateTokenPair({ userId: id, email });

            await tokenRepositories.createToken({ userId: id, refreshToken, accessToken });

            res.json({
                accessToken,
                refreshToken,
                user: req.user,
            });
        } catch (e) {
            res.status(400).json(e);
        }
    }

    public async sendForgotPassword(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const { id, email, firstName } = req.user as IUser;

            const token = tokenService.generateActionToken({ userId: id, email });

            await actionTokenRepositories.createActionToken({ actionToken: token, type: ActionTokenTypes.forgotPassword, userId: id });

            await emailService.sendMail(email, emailActionEnum.ACCOUNT_BLOCKED, {
                token,
                userName: firstName,
            });

            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    }

    public async setPassword(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const { id } = req.user as IUser;

            const actionToken = req.get(constants.AUTHORIZATION);

            await userService.updateUser(id, req.body);
            await actionTokenRepositories.deleteByParams({ actionToken });

            res.sendStatus(201);
        } catch (e) {
            next(e);
        }
    }
}

export const authController = new AuthController();
