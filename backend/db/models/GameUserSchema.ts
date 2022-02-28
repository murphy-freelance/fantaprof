import { Schema, model } from "mongoose";

export const GameUserSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  points: Number,
  credits: Number,
});

export const gameUser = model("GameUser", GameUserSchema);
