import { game, action } from "../models";

export async function addActions(name: string, points: number, gameId: string) {
  const Action = new action({ name: name, points: points });

  await game.updateOne({ _id: gameId }, { $push: { actions: Action } });
}
