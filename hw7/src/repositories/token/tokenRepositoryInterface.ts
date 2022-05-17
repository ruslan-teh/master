import { ITokenDataToSave } from '../../interfaces';
import { IToken } from '../../entity';

export interface ITokenRepository {
    createToken(token:ITokenDataToSave):Promise<IToken>;
    findTokenByUserId(userId: number): Promise<IToken | undefined>;
}
