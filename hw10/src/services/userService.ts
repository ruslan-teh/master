import bcrypt from 'bcrypt';

import { UpdateResult } from 'typeorm';
import { IUser } from '../entity';
import { userRepository } from '../repositories';
import { config } from '../config/config';

class UserService {
    public async createUser(body: IUser): Promise<IUser> {
        const { password } = body;

        const hashedPassword = await this._hashPassword(password);
        const userToSave = { ...body, hashedPassword };

        return userRepository.createUser(userToSave);
    }

    public async getUserById(id: number): Promise<IUser | undefined> {
        return userRepository.getUserById(id);
    }

    public async updateUser(id: number, obj: Partial<IUser>): Promise<object | undefined> {
        if (obj.password) {
            obj.password = await this._hashPassword(obj.password);
        }

        return userRepository.updateUser(id, obj);
    }

    public async getUserByEmail(email: string): Promise<IUser | undefined> {
        return userRepository.getUserByEmail(email);
    }

    public async putchUser(id: number, email: string, password: string): Promise<UpdateResult> {
        return userRepository.putchUser(id, email, password);
    }

    public async compareUserPassword(password: string, hash: string): Promise<void | Error> {
        const isPasswordUnique = bcrypt.compare(password, hash);

        if (!isPasswordUnique) {
            throw new Error('User not exist');
        }
    }

    private async _hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, Number(config.USER_SALT_ROUNDS));
    }
}

export const userService = new UserService();
