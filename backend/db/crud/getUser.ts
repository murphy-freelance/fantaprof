import { user } from "../models";

export async function getUser(userId: string) {
  return await user
    .findOne({ _id: userId }, { _id: 0, username: 1 })
    .populate("friends", { _id: 0, username: 1 });
}
