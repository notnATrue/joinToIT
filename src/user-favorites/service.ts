import { ICreateParams } from "./interface";
import { UserFavorites } from "./model";

export class UserFavoritesService {
  static async create(params: ICreateParams): Promise<any> {
    const doc = await UserFavorites.create(params);
    console.log("doc ", doc);
    return doc;
  }

  static async findAll(params): Promise<any> {
    console.log("params ", params);
    const { id: userId } = params;
    console.log("userId ", userId);
    const docs = await UserFavorites.find({ userId }).exec();
    return docs;
  }
}