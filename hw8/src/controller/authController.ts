import { Request, Response } from 'express';
import { ITokenData, IRequestExtended } from '../interfaces';
import { authService } from '../services/authService';
import { COOKIE } from '../constans/cookie';
import { IUser } from '../entity/user';
import { tokenService } from '../services/tokenService';

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
}

export const authController = new AuthController();
