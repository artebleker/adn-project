import express from "express";
import * as postController from "../controllers/post.controller.js";
import { verifyToken } from "../controllers/auth.controller.js";
const postRouter = express.Router();

postRouter.get("/publicaciones", postController.getAllPost);
postRouter.get("/publicaciones/:id", postController.getPostById);

postRouter.post(
  "/publicaciones",
  //  verifyToken,
  postController.createPost
);
postRouter.put(
  "/publicaciones/:id",
  //  verifyToken,
  postController.updatePost
);
postRouter.delete(
  "/publicaciones/:id",
  //  verifyToken,
  postController.deletePost
);

export default postRouter;
