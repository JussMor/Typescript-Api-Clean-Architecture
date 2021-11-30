import { APIAdapter } from "./application/api/ApiAdapter";
import { CreatePost } from "./domain/Blog/UseCase/CreatePost";
import { GetOnePost } from "./domain/Blog/UseCase/GetOnePost";
import { GetAllPosts  } from "./domain/Blog/UseCase/GetAllPosts";
import { PostgresService } from "./infrastructure/postgres/PostgresService";
import { PostgresAdapter } from "./infrastructure/postgres/PostgresAdapter";

async function lauch(){

    const postgresDBService = new PostgresService()
    await postgresDBService.connect()
    const postgresDBAdapter = new PostgresAdapter(postgresDBService)
    const createPost = new CreatePost(postgresDBAdapter)
    const getAllPost = new GetAllPosts(postgresDBAdapter)
    const getOnePost = new GetOnePost(postgresDBAdapter)

    const apiAdapter = new APIAdapter(createPost, getAllPost, getOnePost)
    apiAdapter.launchExpressAPP()
}

lauch()