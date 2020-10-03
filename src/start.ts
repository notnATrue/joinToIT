import dotenv from "dotenv";

import express from "express";
import bodyParser from "body-parser";
import defaultRoute from "./gateway/routes/default";
import { GatewayService } from "./gateway/service";
import { newsService } from "./news/newsService";
import { UserService } from "./user/service";

// import db from './db';

const start = async () => {
  const gateWayService = new GatewayService();
  // await newsService.find();
  const docs = await UserService.findAll();
  console.log(docs);
};

start();

