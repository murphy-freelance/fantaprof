import { user } from "../models";

export async function getFriends(userId: string) {
  return user
    .findOne({ _id: userId }, { _id: 0, friends: 1 })
    .populate("friends", { _id: 0, username: 1 });
}
