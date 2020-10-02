import dotenv from "dotenv";

import express from "express";
import bodyParser from "body-parser";
import defaultRoute from "./gateway/routes/default";
import { GatewayService } from "./gateway/service";
import { newsService } from "./news/newsService";

// import db from './db';

const start = async () => {
  const testObj = {
    news: "hello"
  }
  const start = new GatewayService();
  // await newsService.saveNews(testObj);
  const news = await newsService.find();
  // console.log(news);
};

start();

