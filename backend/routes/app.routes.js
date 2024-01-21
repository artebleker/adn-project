import express from "express";
import * as postController from "../controllers/app.controller.js";

const router = express.Router();

router.get("/publicaciones", postController.getAllPost);
router.post("/publicaciones", postController.createPost);
router.get("/publicaciones/:id", postController.getPostById);
router.put("/publicaciones/:id", postController.updatePost);
router.delete("/publicaciones/:id", postController.deletePost);

export default router;
