import express from "express";
import mongoose from "mongoose";
import { env } from "./config.js";

const app = express();

mongoose
  .connect(`${env.DB_LOCATION}${env.DB_NAME}`)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error(`MongoDB connection error: ${err}`);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

export default app;
