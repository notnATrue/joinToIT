export interface ICreateParams {
  title: string;
  content: string;
  author: string;
}

export interface IDeleteParams {
  author: string;
  id: string;
}

export interface ISaveNews {
  title: string;
  content: string;
  author: string;
}