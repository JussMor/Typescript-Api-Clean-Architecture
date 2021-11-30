import { Post } from "app/domain/Blog/Entity/Post";
import { IPostRepository } from "app/domain/Blog/Port/IPostRepository";
import { PostgresService } from "./PostgresService";

/**
 * Implement output port, create a adapter
*/

export class PostgresAdapter implements IPostRepository { 
        
        constructor(private postgresService:PostgresService){}
    
        public async getAll():Promise<Post[]>{
            return await this.postgresService.findAll()
        }
    
        public async getOne(id:string):Promise<Post|null>{
            return await this.postgresService.findOne(id)
        }
    
        public async add(post:Post):Promise<boolean>{
            const createdPost = await this.postgresService.create(post.title, post.text, post.publishedAt, post.id)
            return createdPost ? true : false
        }
}


