import bodyParser from "body-parser";
import express from "express";
import { db } from "db/db";
import morgan from "morgan";
import cors from "cors";
//@index('routes/*', f => `import ${f.name} from '${f.path}'`)
import friends from "./routes/friends";
import game from "./routes/game";
import user from "./routes/user";
//@endindex

const app = express();

app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(cors());

db.once("open", () => {
  console.log("Connected successfully");
});

app.use("/user", user);
app.use("/friend", friends);
app.use("/game", game);

app.listen(5000, () => {
  console.log("App running on port 5000");
});
