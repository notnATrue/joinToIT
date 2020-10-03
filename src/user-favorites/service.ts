import { ICreateParams } from "./interface";
import { UserFavorites } from "./model";

export class UserFavoritesService {
  static async create(params: ICreateParams): Promise<any> {
    const doc = await UserFavorites.create(params);
    return doc;
  }

  static async findAll(params): Promise<any> {
    const { id: userId } = params;
    const docs = await UserFavorites.find({ userId }).exec();
    return docs;
  }

  static async delete(params): Promise<any> {
    const { id: _id, userId } = params;
    const doc = await UserFavorites.findOneAndDelete({ _id, userId }).exec();
    return doc;
  }
}