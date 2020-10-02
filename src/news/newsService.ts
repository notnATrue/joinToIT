import request from 'request';
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
    })
  }

  static async saveNews(params): Promise<any> {
    // const parsedParams = await Validator.createParams(params);
    // console.log("parsedParams ", parsedParams);
    console.log("params : ", params)
    const articles = params["articles"];
    console.log("articles ", articles);
    for (const article of articles) {
      const { author, title, content } = article;
      await News.create({ author, title, content});
    }
    const docs = await News.find({});
    return docs;
  }

  static async find(): Promise<any> {
    const docs = await News.find({}).exec();
    console.log(docs)
    return docs;
  }
}