import dotenv from "dotenv";

import express from "express";
import bodyParser from "body-parser";
import defaultRoute from "./gateway/routes/default";
// import db from './db';

const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', defaultRoute);

app.listen(port);