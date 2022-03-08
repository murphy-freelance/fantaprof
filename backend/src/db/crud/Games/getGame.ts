import { game } from "models";

export async function getGame(gameId: string) {
  const Game = await game
    .findOne(
      { game_id: gameId },
      { _id: 0, adminUserId: 0, __v: 0, "users._id": 0 }
    )
    .populate("users.user", { _id: 0, username: 1 });
  return Game;
}
