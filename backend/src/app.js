import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRouter from "../routes/auth.routes.js";
import postRouter from "../routes/post.routes.js";
import commentRouter from "../routes/comment.routes.js";

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/adn-project");
const db = mongoose.connection;

db.on("error", (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

db.once("open", async () => {
  console.log("Connected to MongoDB");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/auth", authRouter);
app.use("/", postRouter);
app.use("/", commentRouter);
export default app;
