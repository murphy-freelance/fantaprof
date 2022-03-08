import { user } from "models";
import { getRequests, getGames } from "crud";

export async function getUser(userId: string) {
  const User = await user
    .findOne({ _id: userId }, { _id: 0, username: 1 })
    .populate("friends", { _id: 0, username: 1 });

  const Request = await getRequests(userId);
  const Games = await getGames(userId);

  return { user: User, requests: Request, games: Games };
}
