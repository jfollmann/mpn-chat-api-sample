import { Schema, model } from "mongoose";

const userSchema = new Schema(
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

const userModel = model("User", userSchema);
export { userModel as User }
