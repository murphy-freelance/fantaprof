import { Schema, model } from "mongoose";
import { ActionSchema } from "./ActionSchema";
import { GameUserSchema } from "./GameUserSchema";
import { TeacherSchema } from "./TeacherSchema";

const GameSchema = new Schema({
  game_id: { type: String, unique: true, required: true },
  startDate: Date,
  endDate: Date,
  actions: [ActionSchema],
  teachers: [TeacherSchema],
  startingValue: Number,
  users: [GameUserSchema],
  adminUserId: String,
});

export const game = model("Game", GameSchema);
