import { EntityRepository, getManager, Repository } from 'typeorm';
import { IToken, Token } from '../../entity';
import { ITokenRepository } from './tokenRepositoryInterface';

@EntityRepository(Token)
class TokenRepository extends Repository<Token> implements ITokenRepository {
    public async createToken(token: { accessToken: string; userId: number; refreshToken: string }):Promise<IToken> {
        return getManager().getRepository(Token).save(token);
    }

    public async findTokenByUserId(userId:number):Promise<IToken | undefined> {
        return getManager().getRepository(Token).findOne({ userId });
    }

    public async deleteByParams(findObject:Partial<IToken>) {
        return getManager().getRepository(Token).delete(findObject);
    }

    public async findByParams(filterObject: Partial<IToken>): Promise<IToken | undefined> {
        return getManager().getRepository(Token).findOne(filterObject);
    }
}

export const tokenRepository = new TokenRepository();
