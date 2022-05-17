import { getManager, Repository } from 'typeorm';
import { IToken, Token } from '../../entity';

class TokenRepositories extends Repository<Token> {
    public async createToken(token: {userId: number, accessToken: string, refreshToken: string}): Promise<IToken> {
        return getManager().getRepository(Token).save(token);
    }

    public async findTokenByUserId(userId: number): Promise<IToken | undefined> {
        return getManager().getRepository(Token).findOne(userId);
    }

    public async deleteByParams(findObject: Partial<IToken>) {
        return getManager().getRepository(Token).delete(findObject);
    }

    public async findByParams(filterObject: Partial<IToken>): Promise<IToken | undefined> {
        return getManager().getRepository(Token).findOne(filterObject);
    }
}

export const tokenRepositories = new TokenRepositories();
