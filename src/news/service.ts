import request from 'request';
import { ICreateParams, IDeleteParams, ISaveNews } from './interface';
import { News } from "./model";
import { Validator } from './validator';

export class newsService {
  static async getNews(): Promise<any> {
    return new Promise(function (resolve, reject) {
      const url = 'http://newsapi.org/v2/top-headlines?' +
        'country=us&' +
        'apiKey=1c273e89a95f41e4b9f69486bedc5a58';
      return request(url, async function (error, response, body) {
        resolve(body);
      });
    });
  }

  static async create(params: ICreateParams): Promise<any> {
    const doc = await News.create(params);
    return doc;
  }

  static async delete(params: IDeleteParams): Promise<any> {
    const { author, id: _id } = params;
    const doc = await News.findOneAndDelete({ author, _id }).exec();
    return doc;
  }

  static async saveNews(params): Promise<any> {
    const articles: ISaveNews[] = params["articles"];
    for (const article of articles) {
      const { author, title, content } = article;
      await News.create({ author, title, content });
    }
    const docs = await News.find({});
    return docs;
  }

  static async find(): Promise<any> {
    const docs = await News.find({}).exec();
    return docs;
  }

  static async findByIds(params): Promise<any> {
    const docs = await News.find({ _id: { $in: params } }).exec();
    return docs;
  }
}
