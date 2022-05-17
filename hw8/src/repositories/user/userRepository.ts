import {
    DeleteResult,
    EntityRepository, getManager, Repository, UpdateResult,
} from 'typeorm';
import { IUser, User } from '../../entity';
import { IUserRepository } from './userRepository.interface';

@EntityRepository(User)
class UserRepository extends Repository<User> implements IUserRepository {
    public async createUser(user:IUser):Promise<IUser> {
        return getManager().getRepository(User).save(user);
    }

    public async getUserById(id : number): Promise<IUser | undefined> {
        return getManager().getRepository(User)
            .createQueryBuilder('user')
            .where('user.id = :id', { id })
            .getOne();
    }

    public async getAllUsers():Promise<IUser[] | undefined> {
        return getManager().getRepository(User)
            .createQueryBuilder('user')
            .getMany();
    }

    public async getUserByEmail(email:string):Promise<IUser | undefined> {
        return getManager().getRepository(User)
            .createQueryBuilder('user')
            .where('user.email = :email', { email })
            .andWhere('user.deletedAt IS NULL')
            .getOne();
    }

    public async pathUser(id:number, email:string, password: string):Promise<UpdateResult> {
        return getManager().getRepository(User)
            .update({ id }, {
                email,
                password,
            });
    }

    public async deleteUser(id:number):Promise<DeleteResult> {
        return getManager().getRepository(User)
            .delete({ id });
    }
}

export const userRepository = new UserRepository();
