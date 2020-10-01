
import dotenv from "dotenv";
import express, { ErrorRequestHandler, Express, NextFunction, Request, RequestHandler, Response } from "express";
import defaultRoute from "./routes/default";
import bodyParser from "body-parser";

export class GatewayService {
  constructor() {
    this.created();
  }
  private server: Express;

  async created(): Promise<void> {
    this.server = express();
    const port = process.env.PORT || 3000;
    this.server.listen(port);
    console.log(`Server are starting at port ${process.env.PORT}`);

    this.server.use(bodyParser());
    this.server.use(bodyParser.json());
    this.server.use(bodyParser.urlencoded({ extended: true }));
    
    this.server.get('/', defaultRoute);
  }
}
