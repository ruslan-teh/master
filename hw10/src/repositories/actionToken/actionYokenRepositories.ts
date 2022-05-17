import { EntityRepository, getManager, Repository } from 'typeorm';
import { ActionToken, IActionToken, IActionTokenForSave } from '../../entity/actionToken';
import { IActionTokenRepositories } from './actionTokenRepositories.interface';

@EntityRepository(ActionToken)
class ActionTokenRepositories extends Repository<ActionToken> implements IActionTokenRepositories {
    async createActionToken(token: IActionTokenForSave): Promise<ActionToken> {
        return getManager().getRepository(ActionToken).save(token);
    }

    async findByParams(filterObject: Partial<IActionToken>): Promise<IActionToken | undefined> {
        return getManager().getRepository(ActionToken).findOne(filterObject);
    }

    async deleteByParams(findObject: Partial<IActionToken>) {
        return getManager().getRepository(ActionToken).delete(findObject);
    }
}

export const actionTokenRepositories = new ActionTokenRepositories();
