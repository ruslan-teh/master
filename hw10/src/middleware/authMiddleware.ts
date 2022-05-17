import { NextFunction, Response } from 'express';

import { IRequestExtended } from '../interfaces';
import { tokenService, userService } from '../services';
import { constants } from '../constants';
import { tokenRepositories } from '../repositories';
import { userValidator } from '../validators/userValidator';
import { ErrorHandler } from '../error/ErrorHandler';
import { actionTokenRepositories } from '../repositories/actionToken/actionYokenRepositories';

class AuthMiddleware {
    public async checkAccessToken(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const authToken = req.get(constants.AUTHORIZATION);

            if (!authToken) {
                throw new Error('no token');
            }

            const { email } = tokenService.verifyToken(authToken);

            const userFromToken = await userService.getUserByEmail(email);

            if (!userFromToken) {
                throw new Error('wrong token');
            }

            req.user = userFromToken;

            next();
        } catch (e: any) {
            res.json({
                status: 400,
                massage: e.message,
            });
        }
    }

    public async checkRefreshToken(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const refreshToken = req.get(constants.AUTHORIZATION);

            if (!refreshToken) {
                throw new Error('no token');
            }

            const { email } = tokenService.verifyToken(refreshToken, 'refresh');

            const tokenPairFromDB = tokenRepositories.findByParams({ refreshToken });

            if (!tokenPairFromDB) {
                throw new Error('token not valid');
            }

            const userFromToken = await userService.getUserByEmail(email);

            if (!userFromToken) {
                throw new Error('token not valid');
            }

            req.user = userFromToken;

            next();
        } catch (e: any) {
            res.json({
                status: 400,
                massage: e.message,
            });
        }
    }

    public async checkActionToken(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const actionToken = req.get(constants.AUTHORIZATION);

            if (!actionToken) {
                next(new ErrorHandler('No Token'));
                return;
            }

            const { email } = tokenService.verifyToken(actionToken, 'action');

            const tokenFromDB = await actionTokenRepositories.findByParams({ actionToken });

            if (!tokenFromDB) {
                next(new ErrorHandler('Token not valid', 401));
                return;
            }

            const userFromToken = await userService.getUserByEmail(email);

            if (!userFromToken) {
                next(new ErrorHandler('Token not valid', 401));
                return;
            }

            req.user = userFromToken;
            next();
        } catch (e: any) {
            res.status(401).json({
                status: 401,
                message: e.massage,
            });
        }
    }

    // validations
    public async isLoginValid(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const { error, value } = await userValidator.login.validate(req.body);
            if (error) {
                next(new Error(error.details[0].message));
            }

            req.body = value;
        } catch (e) {
            next(e);
        }
    }

    public checkValidEmail(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const { error, value } = userValidator.email.validate(req.body);

            if (error) {
                next(new ErrorHandler(error.details[0].message));
                return;
            }

            req.body = value;
            next();
        } catch (e) {
            next(e);
        }
    }

    public checkValidPass(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const { error, value } = userValidator.password.validate(req.body);

            if (error) {
                next(new ErrorHandler(error.details[0].message));
                return;
            }

            req.body = value;
            next();
        } catch (e) {
            next(e);
        }
    }
}

export const authMiddleware = new AuthMiddleware();
