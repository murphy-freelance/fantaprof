import { game } from "models";

export async function addTeacher(name: string, value: number, gameId: string) {
  const Teacher = { name: name, value: value };

  await game.updateOne({ _id: gameId }, { $push: { teachers: Teacher } });
}
