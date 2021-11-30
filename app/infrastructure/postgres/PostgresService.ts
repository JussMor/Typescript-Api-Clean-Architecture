import { Model, ModelCtor, Sequelize } from "sequelize"
import { PostDocument, generateModel } from "./PostgresPostModel"


export class PostgresService {
    private postModel: ModelCtor<Model<any, any>> | null = null

    async connect() {
        const sequelize = new Sequelize({
            dialect: "postgres",
            host: "localhost",
            port: 5432,
            database: "todo_app",
            username: "root",
            password: "9135lp",
        });
        await sequelize.authenticate();
        this.postModel = generateModel(sequelize);
        sequelize.sync({ force: true });
    }

    async findOne(id: string): Promise<PostDocument | null> {
        if (!this.postModel) {
            throw new Error("Modelo borrado");
        }
        return await this.postModel.findOne({ where: { id } }) as unknown as PostDocument | null;
    }

    async findAll(): Promise<PostDocument[]> {
        if (!this.postModel) {
            throw new Error("Missing post model")
        }
        return await this.postModel.findAll() as PostDocument[] | []
    }

    async create(
        title: string,
        text: string,
        publishedAt: Date,
        id: string
    ): Promise<PostDocument | null> {
        if (!this.postModel) {
            throw new Error("Missing post model")
        }
        return await this.postModel.create({
            title,
            text,
            id,
            publishedAt,
        }) as any as PostDocument
    }
}