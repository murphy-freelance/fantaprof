import { user, request } from "models";
import { nanoid } from "nanoid";

export async function createRequest(
  senderId: string,
  receiverUsername: string
) {
  const sender = await user.findOne({ _id: senderId }, { _id: 1 });
  const receiver = await user.findOne(
    { username: receiverUsername },
    { _id: 1 }
  );

  const Request = new request({
    sender: sender._id,
    receiver: receiver._id,
    state: 0,
    requestId: nanoid(8),
  });

  await Request.save();
  return Request;
}
