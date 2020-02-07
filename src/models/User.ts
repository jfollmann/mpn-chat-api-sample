import { Schema, model } from "mongoose";

const user = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
  },
  {
    timestamps: true,
    collection: "User"
  }
);

const userModel = model("User", user);
export { userModel as User }
