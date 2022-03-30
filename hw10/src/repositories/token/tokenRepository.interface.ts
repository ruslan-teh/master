import { ITokenDataToSave } from '../../interfaces';
import { IToken } from '../../entity/token';

export interface ITokenRepository{
    createToken(token: { userId: number; refreshToken: string }): Promise<IToken>;
    findTokenByUserId(userId: number): Promise<IToken|undefined>;
}
