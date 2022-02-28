import bodyParser from "body-parser";
import express from "express";
import { db } from "./db/db";
import { generateAccessToken, authenticateToken, logInUser } from "./auth/auth";
import { getFriends, createUser, addFriend, getUser } from "./db/crud";
import morgan from "morgan";
import cors from "cors";

db.once("open", () => {
  console.log("Connected successfully");
});

const app = express();
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(cors());

app.get("/user", authenticateToken, async (req: any, res) => {
  res.send(await getUser(req.userId));
});

app.post("/user/signup", async (req, res) => {
  const user = await createUser(req.body.username, req.body.password);
  const token = generateAccessToken({ userId: user._id });
  if (user.error) {
    res.send(user);
  } else {
    res.send({ token: token });
  }
});

app.post("/user/login", async (req, res) => {
  console.log(req.body);
  res.send(await logInUser(req.body.username, req.body.password));
});

app.post("/user/add-friend", authenticateToken, async (req: any, res) => {
  await addFriend(req.userId, req.body.friendUsername);
  res.send("success");
});

app.get("/user/friends", authenticateToken, async (req: any, res) => {
  res.send(await getFriends(req.userId));
});

app.listen(5000, () => {
  console.log("App running on port 5000");
});
