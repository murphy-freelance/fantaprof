import { Schema, model } from "mongoose";

export interface GameUser {
  user: string;
  points: number;
  credits: number;
}

export const GameUserSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  points: Number,
  credits: Number,
});
