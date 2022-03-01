import express from "express";
import { generateAccessToken, authenticateToken, logInUser } from "auth";
import { getFriends, createUser, getUser } from "crud";

const router = express.Router();

router.get("/", authenticateToken, async (req: any, res) => {
  res.send(await getUser(req.userId));
});

router.get("/friends", authenticateToken, async (req: any, res) => {
  res.send(await getFriends(req.userId));
});

//

router.post("/signup", async (req, res) => {
  const user = await createUser(req.body.username, req.body.password);
  const token = generateAccessToken({ userId: user._id });
  if (user.error) {
    res.send(user);
  } else {
    res.send({ token: token });
  }
});

router.post("/login", async (req, res) => {
  console.log(req.body);
  res.send(await logInUser(req.body.username, req.body.password));
});

export default router;
