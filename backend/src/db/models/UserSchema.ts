import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: String,
  friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

export const user = model("User", UserSchema);
