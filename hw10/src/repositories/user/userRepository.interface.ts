import { IUser, User } from '../../entity/user';

export interface IUserRepository {
    createUser(user:IUser): Promise<IUser>;

    getUserByEmail(email: string): Promise<User | undefined>;
}
