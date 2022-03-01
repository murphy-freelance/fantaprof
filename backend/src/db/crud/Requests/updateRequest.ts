import { request } from "models";

export async function updateRequest(state: 0 | 1 | 2, requestId: string) {
  await request.updateOne({ requestId }, { state });
}
