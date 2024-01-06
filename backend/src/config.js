import { config } from "dotenv";

config();

export const env = {
  PORT: process.env.PORT,
  DB_NAME: process.env.DB_NAME,
  DB_LOCATION: process.env.DB_LOCATION,
};
