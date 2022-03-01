import { user } from "models";
import { getRequests } from "crud";

export async function getUser(userId: string) {
  const User = await user
    .findOne({ _id: userId }, { _id: 0, username: 1 })
    .populate("friends", { _id: 0, username: 1 });

  const Request = await getRequests(userId);

  return { user: User, requests: Request };
}
