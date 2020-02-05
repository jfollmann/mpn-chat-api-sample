import { Schema, model } from "mongoose";

const person = new Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
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
    collection: "Person"
  }
);

const personModel = model("Person", person);
export { personModel as Person }
