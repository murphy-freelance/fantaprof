import { user } from "../models";

export async function addFriend(userId: string, friendUsername: string) {
  const friendId = await user
    .findOne({ username: friendUsername })
    .select("id");
  await user.updateOne({ _id: userId }, { $push: { friends: friendId } });
}
