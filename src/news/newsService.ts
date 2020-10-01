import request from 'request';
export class newsService {
  static async getNews(): Promise<any> {
    const url = 'http://newsapi.org/v2/top-headlines?' +
    'country=us&' +
    'apiKey=1c273e89a95f41e4b9f69486bedc5a58';
    return request(url, async function (error, response, body) {
      return body;
    });
  }
}
