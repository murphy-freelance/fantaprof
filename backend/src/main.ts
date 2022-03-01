import bodyParser from "body-parser";
import express from "express";
import { db } from "db/db";
import morgan from "morgan";
import cors from "cors";
import user from "routes/user";
import friends from "routes/friends";

const app = express();

app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(cors());

db.once("open", () => {
  console.log("Connected successfully");
});

app.use("/user", user);
app.use("/friend", friends);

app.listen(5000, () => {
  console.log("App running on port 5000");
});
