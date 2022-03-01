import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { createHash } from "crypto";
import { user } from "models";

dotenv.config();

export function createPasswordHash(password: string) {
  return createHash("sha256").update(password).digest("hex");
}

export function generateAccessToken(userId: object) {
  return jwt.sign(userId, process.env.SECRET_KEY as string, {
    expiresIn: "10080s",
  });
}

export async function authUser(username: string, password: string) {
  const User = await user.findOne({ username });
  const passwordHash = createPasswordHash(password);
  if (User.password == passwordHash) {
    return true;
  } else {
    return false;
  }
}

export async function logInUser(username: string, password: string) {
  if (await user.findOne({ username })) {
    if (await authUser(username, password)) {
      const User = await user.findOne({ username });
      return { token: generateAccessToken({ userId: User._id }) };
    } else {
      return { error: true };
    }
  } else {
    return { error: true };
  }
}

export function authenticateToken(req: any, res: any, next: any) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(
    token,
    process.env.SECRET_KEY as string,
    (err: any, userId: any) => {
      console.log(err);

      if (err) return res.sendStatus(403);

      req.userId = userId.userId;

      next();
    }
  );
}
