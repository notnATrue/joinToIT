import { Schema } from "mongoose";

export const UserSchema: Schema = new Schema({
  session: String
}, { timestamps: true });

UserSchema.set("toObject", { virtuals: true });
UserSchema.set("toJSON", { virtuals: true });

UserSchema.index({ createdAt: 1 });
UserSchema.index({ updatedAt: 1 });

export default UserSchema;
