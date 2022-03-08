import express from "express";
import { authenticateToken } from "auth";
import { addActions, addTeacher, createGame, getGame } from "crud";
import { game } from "models";

const router = express.Router();

router.post("/", authenticateToken, async (req: any, res) => {
  const Game = await createGame(
    new Date(),
    req.body.endDate,
    req.body.startingValue,
    req.userId,
    req.body.teachers,
    req.body.actions,
    req.body.users
  );

  const createdGame = await game
    .findOne(
      { game_id: Game.game_id },
      {
        _id: 0,
        game_id: 1,
        startDate: 1,
        users: {
          user: 1,
          points: 1,
          credits: 1,
        },
        teachers: {
          name: 1,
          value: 1,
        },
        actions: {
          name: 1,
          value: 1,
        },
      }
    )
    .populate("users.user", { username: 1, _id: 0 });

  res.send(createdGame);
});

router.get("/:id", async (req: any, res) => {
  const Game = await getGame(req.params.id);
  res.send(Game);
});

export default router;
