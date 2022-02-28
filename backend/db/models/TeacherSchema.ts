import { Schema, model } from "mongoose";

export const TeacherSchema = new Schema({
  name: String,
  value: Number,
});

export const teacher = model("Teacher", TeacherSchema);
