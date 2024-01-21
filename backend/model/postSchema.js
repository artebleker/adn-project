import { Schema, model } from "mongoose";

const postSchema = new Schema(
  {
    title: String,
    description: String,
    image: String,
    author: String,
  },
  {
    timestamps: true,
  }
);

const Post = model("Post", postSchema);

export default Post;
