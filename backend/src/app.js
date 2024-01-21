import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import router from "../routes/app.routes.js";

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
app.use("/", router);
export default app;
