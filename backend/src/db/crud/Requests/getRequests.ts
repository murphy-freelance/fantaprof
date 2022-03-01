import { request } from "models";

export async function getRequests(userId: string) {
  const requests = await request
    .find(
      {
        receiver: userId,
      },
      { _id: 0, __v: 0 }
    )
    .populate("sender receiver", { username: 1, _id: 0 });
  return requests;
}
