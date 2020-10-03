
import dotenv from "dotenv";
import express, { ErrorRequestHandler, Express, NextFunction, Request, RequestHandler, Response } from "express";

import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';
import { DataBase } from "../db/service";
import { newsService } from "../news/newsService";
import defaultRoute from "./routes/default";
import feedRoute from "./routes/feed.route";
import authorizeRoute from "./routes/authorize.route";
import addFeedRoute from "./routes/add.feed.route";
import removeFeedRoute from "./routes/remove.feed.route";
import addFavoritesRoute from "./routes/add.favorites.route";
import findAllFavorites from "./routes/find.favorites.route";
import passport from 'passport';
import { OAuth2Strategy } from 'passport-oauth';
import { ClientCredentials, ResourceOwnerPassword, AuthorizationCode } from 'simple-oauth2';
import oauth2lib from 'oauth20-provider';
import schedule from 'node-schedule';
// import authCheck from "./routes/authCheck";


var oauth2 = new oauth2lib({ log: { level: 2 } });

function isAuthorized(req: Request, res: Response, next) {
  if (req.session.authorized) next();
  else {
      var params = req.query;
      params.backUrl = req.path;
      res.redirect('/login?' + req.query.stringify(params));
  }
};
 
const timeManager = schedule.scheduleJob('03 20 * * *', async function(){
  const news = await newsService.getNews();
  console.log("News from API: ", news);
  const parsedNews = JSON.parse(news)
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
    // this.server.use(oauth2.inject());
    
    this.server.get('/', defaultRoute);
    this.server.get('/feed', feedRoute);
    this.server.get('/authorize', authorizeRoute);
    this.server.post('/feed', addFeedRoute);
    this.server.delete('/feed/:id', removeFeedRoute);
    this.server.post('/favorites/save/:id', addFavoritesRoute);
    this.server.get('/favorites', findAllFavorites);
    
    this.server.post('/token', oauth2.controller.token);
    this.server.get('/authorization', isAuthorized, oauth2.controller.authorization, function(req, res) {
      // Render our decision page
      // Look into ./test/server for further information
      res.render('authorization', {layout: false});
    });
    this.server.post('/authorization', isAuthorized, oauth2.controller.authorization);
      // this.server.get('/auth', authCheck);
   }
}
