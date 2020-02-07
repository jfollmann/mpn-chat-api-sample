import { Schema, model, Types } from "mongoose";

const message = new Schema(
  {
    userTo: {
      required: true,
      type: Types.ObjectId,
      ref: "User"
    },
    userFrom: {
      required: true,
      type: Types.ObjectId,
      ref: "User"
    },
    content: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
    collection: "Message"
  }
);

const messageModel = model("Message", message);
export { messageModel as Message }
