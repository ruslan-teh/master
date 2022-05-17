import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CommonFields, ICommonFields } from './commonFields';

export interface IUser extends ICommonFields{
    firstName: string,
    lastName: string,
    age?: number
    phone: string,
    email: string,
    password: string,
}

@Entity('Users', { database: 'new_database' })
export class User extends CommonFields implements IUser {
    @PrimaryGeneratedColumn()
        id: number;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        firstName: string;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        lastName: string;

    @Column({
        type: 'int',
    })
        age?: number;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
        unique: true,
    })
        phone: string;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
        unique: true,
    })
        email: string;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        password: string;
}
