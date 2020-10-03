import { IUser } from "./interface";
import { User } from "./model";

export class UserService {
  static async create(params: IUser): Promise<any> {
    const doc = await User.create(params);
    return doc;
  };

  static async find(params: IUser): Promise<any> {
    const { session } = params;
    const doc = await User.findOne({ session });
    return doc;
  };

  static async findOrCreate(params: IUser): Promise<any> {
    const doc = await User.findOne(params);
    if (!doc) {
      const createdUser = await User.create(params);
      return createdUser;
    }
    return doc;
  }

  static async findAll(): Promise<any> {
    const doc = await User.find({}).exec();
    console.log(doc);
  }
}