import {
    Column, Entity, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm';
import { IPost, Post } from './post';
import { Comment, IComment } from './comments';
import { CommonFields } from './commonFields';
import { config } from '../config';

export interface IUser {
    id: number,
    firstName: string;
    lastName: string;
    age?: number;
    phone?: string;
    email: string;
    password: string;
    posts?: IPost[];
    comments?: IComment[];
}

@Entity('Users', { database: config.MYSQL_DATABASE_NAME })
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
        phone?: string;

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

    @OneToMany(() => Post, (post) => post.user)
        posts: Post[];

    @OneToMany(() => Comment, (comment) => comment.user)
        comments: Comment[];
}
