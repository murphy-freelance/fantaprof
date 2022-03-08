import { Schema } from "mongoose";

export interface Teacher {
  name: string;
  value: number;
}

export const TeacherSchema = new Schema({
  name: String,
  value: Number,
});
