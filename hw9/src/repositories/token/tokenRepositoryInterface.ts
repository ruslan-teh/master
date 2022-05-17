import { IToken } from '../../entity';

export interface ITokenRepository {
    createToken(token: { accessToken: string; userId: number; refreshToken: string }):Promise<IToken>;
    findTokenByUserId(userId: number): Promise<IToken | undefined>;
}
