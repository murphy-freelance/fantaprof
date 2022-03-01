import { user } from "models";

export async function addFriend(userId: string, friendId: string) {
  await user.updateOne({ _id: userId }, { $push: { friends: friendId } });
  await user.updateOne({ _id: friendId }, { $push: { friends: userId } });
}
