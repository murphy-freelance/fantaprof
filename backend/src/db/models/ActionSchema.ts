import { Schema, model } from "mongoose";

export interface Action {
  name: string;
  points: number;
}

export const ActionSchema = new Schema({
  name: String,
  points: Number,
});

export const action = model("Action", ActionSchema);
