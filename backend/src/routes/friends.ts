import { authenticateToken } from "auth";
import {
  addFriend,
  createRequest,
  updateRequest,
  getRequests,
  removeFriend,
} from "crud";
import { user, request } from "models";
import express from "express";

const router = express.Router();

router.post("/send-request", authenticateToken, async (req: any, res) => {
  await createRequest(req.userId, req.body.username);
  res.send({ error: false });
});

router.post("/request/:id", authenticateToken, async (req: any, res) => {
  const Request = await request.findOne({ requestId: req.params.id });
  if (Request.receiver == req.userId) {
    if (req.body.accept) {
      await addFriend(req.userId, Request.sender);
      await request.deleteOne(Request._id);
      res.send({ message: "request accepted" });
    } else {
      await request.deleteOne(Request._id);
      res.send({ message: "request denied" });
    }
  } else {
    res.send({ error: true });
  }
});

router.post("/remove", authenticateToken, async (req: any, res) => {
  const Friend = await user.findOne(
    { username: req.body.username },
    { _id: 1 }
  );
  await removeFriend(req.userId, Friend._id);
  res.send({ error: false });
});

router.get("/request", authenticateToken, async (req: any, res) => {
  res.send({ requests: await getRequests(req.userId) });
});

export default router;
