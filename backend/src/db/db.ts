import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(process.env.MONGO_SERVER_URL);

export const db = mongoose.connection;

db.on("error", (err) => {
  console.log(err);
});
