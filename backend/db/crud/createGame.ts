import { game } from "../models";
import { nanoid } from "nanoid";

export async function createGame(
  startDate: Date,
  endDate: Date,
  startingValue: number,
  adminUserId: string
) {
  const Game = new game({
    game_id: nanoid(6),
    startDate: startDate,
    endDate: endDate,
    startingValue: startingValue,
    actions: [],
    teachers: [],
    users: [],
    adminUserId: adminUserId,
  });

  await Game.save();
  return Game;
}
