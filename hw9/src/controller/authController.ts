import { Request, Response } from 'express';
import { ITokenData, IRequestExtended } from '../interfaces';
import { authService, tokenService, userService } from '../services';
import { COOKIE } from '../constans';
import { IUser } from '../entity/user';
import { tokenRepository } from '../repositories/token/tokenRepository';

class AuthController {
    public async registration(req:Request, res:Response):Promise<Response<ITokenData>> {
        const data = await authService.registration(req.body);
        res.cookie(
            COOKIE.nameRefreshToken,
            data.refreshToken,
            { maxAge: COOKIE.maxAgeRefreshToken, httpOnly: true },
        );

        return res.json(data);
    }

    public async logout(req: IRequestExtended, res: Response): Promise<Response<string>> {
        const { id } = req.user as IUser;

        await tokenService.deleteUserTokenPair(id);

        return res.json('ok');
    }

    public async login(req:IRequestExtended, res: Response) {
        try {
            const { id, email, password: hashPassword } = req.user as IUser;
            const { password } = req.body;

            await userService.compareUserPasswords(password, hashPassword);

            // @ts-ignore
            const { refreshToken, accessToken } = tokenService.generateTokenPair({
                userId: id,
                userEmail: email,
            });

            await tokenRepository.createToken({ refreshToken, accessToken, userId: id });

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
            const refreshTokenDelete = req.get('Authorization');

            await tokenService.deleteTokenPairByParams({ refreshToken: refreshTokenDelete });

            const { accessToken, refreshToken } = await tokenService.generateTokenPair({
                userId: id,
                userEmail: email,
            });

            await tokenRepository.createToken({ refreshToken, accessToken, userId: id });

            res.json({
                refreshToken,
                accessToken,
                user: req.user,
            });
        } catch (e) {
            res.status(400).json(e);
        }
    }
}

export const authController = new AuthController();
