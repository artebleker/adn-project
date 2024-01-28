import express from "express";
import { signup, login, verifyToken } from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/signup", signup);

authRouter.post("/login", login);

// authRouter.use(verifyToken);

export default authRouter;
