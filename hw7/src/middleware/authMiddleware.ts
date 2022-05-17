import {NextFunction, Response} from "express";

import {IRequestExtended} from "../interfaces";
import {tokenService, userService} from "../services";

class AuthMiddleware{
    public async checkAccessToken (req:IRequestExtended, res:Response, next:NextFunction) {
        try{
            const authToken = req.get('Authorization');

            if (!authToken){
                throw new Error('No token')
            }

            const { userEmail } = tokenService.verifyToken(authToken);

            const userFromToken = await userService.getUserByEmail(userEmail);

            if (!userFromToken){
                throw new Error('Wrong Token');
            }

            req.user = userFromToken;
        }catch (e: any) {
            res.json({
                status: 400,
                message: e.message,
            });

        }
    }
}

export const authMiddleware = new AuthMiddleware();