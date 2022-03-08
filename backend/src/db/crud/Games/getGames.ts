import { game } from "models";

export async function getGames(userId: string) {
  return await game.find({ "users.user": userId });
}
