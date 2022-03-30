import { EntityRepository, getManager, Repository } from 'typeorm';
import { IToken, Token } from '../../entity/token';
import { ITokenRepository } from './tokenRepository.interface';
import { ITokenDataToSave } from '../../interfaces';

@EntityRepository(Token)
class TokenRepository extends Repository<Token> implements ITokenRepository {
    public async createToken(token: { userId: number; refreshToken: string }): Promise<IToken> {
        return getManager().getRepository(Token).save(token);
    }

    public async findTokenByUserId(userId:number): Promise<IToken | undefined> {
        return getManager().getRepository(Token).findOne({ userId });
    }

    public async findByParams(filterObject: { accessToken: string }): Promise<IToken | undefined> {
        return getManager().getRepository(Token).findOne(filterObject);
    }

    public async deleteByParams(findObject: Partial<IToken>) {
        return getManager().getRepository(Token).delete(findObject);
    }
}

export const tokenRepository = new TokenRepository();
