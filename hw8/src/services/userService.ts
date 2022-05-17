import bcrypt from 'bcrypt';

import { DeleteResult, UpdateResult } from 'typeorm';
import { IUser } from '../entity';
import { userRepository } from '../repositories';
import { config } from '../config/config';

class UserService {
    public async createUser(user: IUser):Promise<IUser> {
        const { password } = user;

        const hashedPassword = await this._hashPasword(password);
        const userToSave = { ...user, password: hashedPassword };

        return userRepository.createUser(userToSave);
    }

    public async getAllUsers():Promise<IUser[] | undefined> {
        return userRepository.getAllUsers();
    }

    public async getUserById(id : number): Promise<IUser | undefined> {
        return userRepository.getUserById(id);
    }

    public async getUserByEmail(email:string): Promise<IUser | undefined> {
        try {
            return userRepository.getUserByEmail(email);
        } catch (e) {
            throw new Error(`${e}`);
        }
    }

    public async compareUserPasswords(password:string, hash: string): Promise<void | Error>{
        const isPasswordUnique = bcrypt.compare(password, hash);

        if (!isPasswordUnique){
            throw new Error('Invalid login or password!')
        }
    }

    public async patcUser(id:number, email:string, password:string):Promise<UpdateResult> {
        try {
            return userRepository.pathUser(id, email, password);
        } catch (e) {
            throw new Error();
        }
    }

    public async deleteUser(id:number):Promise<DeleteResult> {
        try {
            return userRepository.deleteUser(id);
        } catch (e) {
            throw new Error();
        }
    }

    private _hashPasword(password:string):Promise<string> {
        return bcrypt.hash(password, Number(config.USER_SALT_ROUNDS));
    }
}

export const userService = new UserService();
