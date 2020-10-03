import { ICreateParams, IFindOrCreateParams, IFindParams } from "./interface";
import { User } from "./model";

export class UserService {
  static async create(params: ICreateParams): Promise<any> {
    const doc = await User.create(params);
    return doc;
  };

  static async find(params: IFindParams): Promise<any> {
    const { session } = params;
    const doc = await User.findOne({ session });
    return doc;
  };

  static async findOrCreate(params: IFindOrCreateParams): Promise<any> {
    const doc = await User.findOne(params);
    if (!doc) {
      const createdUser = await User.create(params);
      return createdUser;
    }
    return doc;
  }

  static async findAll(): Promise<any> {
    const doc = await User.find({}).exec();
    return doc;
  }
}