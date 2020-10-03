import { Schema } from "mongoose";

export const NewsSchema: Schema = new Schema({
  author: String,
  title: String,
  content: String
}, { timestamps: true });

NewsSchema.set("toObject", { virtuals: true });
NewsSchema.set("toJSON", { virtuals: true });

NewsSchema.index({ createdAt: 1 });
NewsSchema.index({ updatedAt: 1 });

export default NewsSchema;
