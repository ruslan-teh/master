import { IUser } from '../../entity';

export interface IUserRepository {
    createUser(user: IUser): Promise<IUser>;
}
