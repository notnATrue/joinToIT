import { model } from "mongoose";
import NewsSchema from "./schema";

const Model = model(
  "News", NewsSchema, "news",
);

export class News extends Model {}
