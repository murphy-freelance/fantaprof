import { user } from "models";

export async function removeFriend(userId: string, friendId: string) {
  await user.updateOne({ _id: userId }, { $pull: { friends: friendId } });
  await user.updateOne({ _id: friendId }, { $pull: { friends: userId } });
}
