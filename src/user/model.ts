import { model } from "mongoose";
import UserSchema from "./schema";

const Model = model(
  "User", UserSchema, "users",
);

export class User extends Model {}
