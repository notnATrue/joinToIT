import dotenv from "dotenv";

import express from "express";
import bodyParser from "body-parser";
import defaultRoute from "./gateway/routes/default";
import { GatewayService } from "./gateway/service"
// import db from './db';

const start = async () => {
  const start = new GatewayService();
};

start();
