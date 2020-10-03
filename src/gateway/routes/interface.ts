export interface IDTO {
  author: string;
  title: string;
  content: string;
  id: string;
}

export interface IAddFavorites {
  newsId: string;
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface IAddFeed {
  title: string;
  content: string;
  author: string;
  createdAt: string;
  id: string;
  updatedAt: string;
}
