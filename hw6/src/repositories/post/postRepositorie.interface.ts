import { UpdateResult } from 'typeorm';
import { IPost } from '../../entity';

export interface IPostRepositorie{
    createPost(post:IPost):Promise<IPost>,
    getUserPost(id:number):Promise<IPost[]>,
    updatePost(id:number, title:string, text:string):Promise<UpdateResult>
}
