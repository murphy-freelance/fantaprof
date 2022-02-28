import { user, request } from "../models";

export async function createRequest(
  senderUsername: string,
  receiverUsername: string,
  state: 0 | 1 | 2
) {
  const sender = user.findOne({ username: senderUsername }, { _id: 1 });
  const receiver = user.findOne({ username: receiverUsername }, { _id: 1 });
}
