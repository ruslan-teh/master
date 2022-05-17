import jwt from 'jsonwebtoken';

import { ITokenPair, IUserPayload } from '../interfaces';
import { config } from '../config/config';
import { IToken } from '../entity';
import { tokenRepositories } from '../repositories';

class TokenService {
    public generateTokenPair(payload: IUserPayload): ITokenPair {
        const accessToken = jwt.sign(
            payload,
            config.SECRET_ACCESS_KEY as string,
            { expiresIn: config.EXPIRES_IN_ACCESS },
        );

        const refreshToken = jwt.sign(
            payload,
            config.SECRET_REFRESH_KEY as string,
            { expiresIn: config.EXPIRES_IN_REFRESH },
        );

        return {
            accessToken,
            refreshToken,
        };
    }

    public async saveToken(userId: number, accessToken: string, refreshToken: string): Promise<IToken> {
        const tokenFromDB = await tokenRepositories.findTokenByUserId(userId);

        if (tokenFromDB) {
            tokenFromDB.refreshToken = refreshToken;
            tokenFromDB.accessToken = accessToken;
            return tokenRepositories.createToken(tokenFromDB);
        }

        return tokenRepositories.createToken({ accessToken, refreshToken, userId });
    }

    public async deleteUserTokenPair(userId: number) {
        return tokenRepositories.deleteByParams({ userId });
    }

    verifyToken(authToken: string, tokenType = 'access'): IUserPayload {
        let secretWord = config.SECRET_ACCESS_KEY;

        if (tokenType = 'refresh') {
            secretWord = config.SECRET_REFRESH_KEY;
        }

        if (tokenType === 'action') {
            secretWord = config.SECRET_ACTION_KEY;
        }

        return jwt.verify(authToken, secretWord as string) as IUserPayload;
    }

    public generateActionToken(payload: IUserPayload): string {
        return jwt.sign(payload, config.SECRET_ACTION_KEY, { expiresIn: config.EXPIRES_IN_ACTION });
    }

    public async deleteTokenPairByParams(searchObject: Partial<IToken>) {
        return tokenRepositories.deleteByParams(searchObject);
    }
}

export const tokenService = new TokenService();
