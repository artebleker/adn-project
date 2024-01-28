import { Schema, model } from "mongoose";

const commentSchema = new Schema(
  {
    text: String,
    author: String,
    post: String,
  },
  {
    timestamps: true,
  }
);

const Comment = model("Comment", commentSchema);

export default Comment;
