import { getManager, UpdateResult } from 'typeorm';
import { IUser, User } from '../../entity';

class UserRepository {
    public async createUser(user: IUser): Promise<IUser> {
        return getManager().getRepository(User).save(user);
    }

    public async updateUser(id: number, user: Partial<IUser>): Promise<object> {
        return getManager().getRepository(User).update({ id }, user);
    }

    public async getUserById(id: number): Promise<IUser | undefined> {
        return getManager().getRepository(User)
            .createQueryBuilder('user')
            .where('user.id = :id', { id })
            .getOne();
    }

    public async getUserByEmail(email:string): Promise<IUser | undefined> {
        return getManager().getRepository(User)
            .createQueryBuilder('user')
            .where('user.email = :email', { email })
            .getOne();
    }

    public async putchUser(id: number, email: string, password: string): Promise<UpdateResult> {
        return getManager().getRepository(User).update({ id }, { email, password });
    }
}

export const userRepository = new UserRepository();
