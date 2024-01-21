import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    username: { type: String, unique: true },
    password: String,
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

export default User;
