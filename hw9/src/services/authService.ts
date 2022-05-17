import { IUser } from '../entity';
import { ITokenData } from '../interfaces';
import { userService } from './userService';
import { tokenService } from './tokenService';

class AuthService {
    public async registration(body: IUser): Promise<ITokenData> {
        const { email } = body;

        const userFromDB = await userService.getUserByEmail(email);

        if (userFromDB) {
            throw new Error('user with email already exist');
        }

        const createUser = await userService.createUser(body);
        return this._getTokenData(createUser);
    }

    private async _getTokenData(userData: IUser):Promise<ITokenData> {
        const { id, email } = userData;

        const tokenPair = await tokenService.generateTokenPair({ userId: id, userEmail: email });
        await tokenService.saveToken(id, tokenPair.refreshToken, tokenPair.accessToken);

        return {
            ...tokenPair,
            userId: id,
            userEmail: email,
        };
    }
}

export const authService = new AuthService();
