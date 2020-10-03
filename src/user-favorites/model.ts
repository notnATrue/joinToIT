import { model } from "mongoose";
import UserFavoritesSchema from "./schema";

const Model = model(
  "UserFavorites", UserFavoritesSchema, "user-favorites",
);

export class UserFavorites extends Model {}
