import { Schema } from "mongoose";

export const FavoritesSchema: Schema = new Schema({
  userId: String,
  newsId: String
}, { timestamps: true });

FavoritesSchema.set("toObject", { virtuals: true });
FavoritesSchema.set("toJSON", { virtuals: true });

FavoritesSchema.index({ createdAt: 1 });
FavoritesSchema.index({ updatedAt: 1 });

export default FavoritesSchema;
