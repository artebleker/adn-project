import express from "express";
import * as publicacionController from "../controllers/app.controller.js";

const router = express.Router();

router.get("/publicaciones", publicacionController.getAllPublicaciones);
router.post("/publicaciones", publicacionController.createPublicacion);
router.get("/publicaciones/:id", publicacionController.getPublicacionById);
router.put("/publicaciones/:id", publicacionController.updatePublicacion);
router.delete("/publicaciones/:id", publicacionController.deletePublicacion);
router.get("/livez", (req, res) => res.status(200).json({ status: "ok" }));

export default router;
