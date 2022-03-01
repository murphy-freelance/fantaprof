import { user } from "models";
import { createPasswordHash } from "auth";

export async function createUser(username: string, password: string) {
  if (await user.findOne({ username })) {
    return { error: true, errorMessage: "username alredy taken" };
  }
  const passwordHash = createPasswordHash(password);

  const User = new user({ username, password: passwordHash });

  await User.save();

  return { error: false, _id: User._id };
}
