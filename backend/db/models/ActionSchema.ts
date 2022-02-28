import { Schema, model } from "mongoose";

export const ActionSchema = new Schema({
  name: String,
  points: Number,
});

export const action = model("Action", ActionSchema);
