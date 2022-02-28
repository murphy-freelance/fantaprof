import { game, gameUser, user } from "../models";

export async function addUser(userId: string, gameId: string) {
  const Game: any = game.findOne({ _id: gameId }, "startingValue");
  const User: any = user.findOne({ _id: userId }, "username");
  const GameUser = new gameUser({
    userId: userId,
    username: User.username,
    points: 0,
    credits: Game.startingValue,
  });
  game.updateOne({ _id: gameId }, { $push: { users: GameUser } });
}
