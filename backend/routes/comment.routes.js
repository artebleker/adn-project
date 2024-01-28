import express from "express";
import * as commentController from "../controllers/comment.controller.js";
import { verifyToken } from "../controllers/auth.controller.js";
const commentRouter = express.Router();

commentRouter.get("/comentarios", commentController.getAllComment);
commentRouter.get(
  "/comentarios/publicacion/:id",
  commentController.getCommentsByPostId
);
commentRouter.get("/comentarios/:id", commentController.getCommentById);

commentRouter.post(
  "/comentarios",
  // verifyToken,
  commentController.createComment
);
commentRouter.put(
  "/comentarios/:id",
  // verifyToken,
  commentController.updateComment
);
commentRouter.delete(
  "/comentarios/:id",
  // verifyToken,
  commentController.deleteComment
);

export default commentRouter;
