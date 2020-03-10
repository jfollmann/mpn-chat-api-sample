import * as mongoose from "mongoose";

export class Database {
  mongoUrl: string;

  constructor() {
    this.mongoUrl = process.env.MONGO_URL || "mongodb://localhost:27017/mpnChatDB";
  }

  connect() {
    mongoose.connect(this.mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });
  }
}

const db = new Database();
export { db }
