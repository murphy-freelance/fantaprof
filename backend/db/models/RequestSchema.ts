import { Schema, model } from "mongoose";

const RequestSchema = new Schema({
  expireAt: {
    type: Date,
    default: Date.now,
    expires: "1m",
  },
  sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
  receiver: { type: Schema.Types.ObjectId, ref: "User", required: true },
  state: { type: Number, required: true },
});

export const request = model("Request", RequestSchema);
