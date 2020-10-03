
import dotenv from "dotenv";
import express, { ErrorRequestHandler, Express, NextFunction, Request, RequestHandler, Response } from "express";

import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';
import { DataBase } from "../db/service";
import { newsService } from "../news/service";
import feedRoute from "./routes/feed.route";
import authorizeRoute from "./routes/authorize.route";
import addFeedRoute from "./routes/add.feed.route";
import removeFeedRoute from "./routes/remove.feed.route";
import addFavoritesRoute from "./routes/add.favorites.route";
import findAllFavorites from "./routes/find.favorites.route";
import deleteFavorites from "./routes/remove.favorites.route";
import schedule from 'node-schedule';

const timeManager = schedule.scheduleJob('00 14 * * *', async function(){
  const news = await newsService.getNews();
  const parsedNews = JSON.parse(news);
  const savedNews = await newsService.saveNews(parsedNews);
  const docs = await newsService.find();
});

export class GatewayService {
  constructor() {
    this.created();
  }
  private server: Express;

  private async created(): Promise<void> {
    this.server = express();
    const port = process.env.PORT || 3000;
    this.server.listen(port);
    console.log(`Server are starting at port ${process.env.PORT}`);

    await DataBase.connect();

    this.server.use(bodyParser());
    this.server.use(bodyParser.json());
    this.server.use(bodyParser.urlencoded({ extended: true }));
    this.server.use(cookieParser());
    
    this.server.get('/feed', feedRoute);
    this.server.get('/authorize', authorizeRoute);
    this.server.post('/feed', addFeedRoute);
    this.server.delete('/feed/:id', removeFeedRoute);
    this.server.post('/favorites/save/:id', addFavoritesRoute);
    this.server.get('/favorites', findAllFavorites);
    this.server.delete('/favorites/:id', deleteFavorites);
   }
}
