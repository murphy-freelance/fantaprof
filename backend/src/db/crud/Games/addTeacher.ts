import { game, teacher } from "models";

export async function addTeacher(name: string, value: number, gameId: string) {
  const Teacher = new teacher({ name: name, value: value });

  await game.updateOne({ _id: gameId }, { $push: { teachers: Teacher } });
}
