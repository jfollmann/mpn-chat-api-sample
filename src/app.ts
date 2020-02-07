// class MyClass {

//   private multiply = 10;

//   log(v1: number): void {
//     console.log("[LogBar] Bar's value is: " + this.multiply * v1);
//   }

//   log2 = (v1: number) => {
//     console.log("[LogBar2] Bar's value is: " + this.multiply * v1);
//   }
// }

// const myObj = new MyClass();
// myObj.log(5);
// myObj.log2(5);

import * as express from "express";
import * as mongoose from "mongoose";
import * as cors from "cors";
import { routes } from "./routes";
import { loggerMiddleware } from "./middlewares/LoggerMiddleware"
import { config as dotEnvConfig } from "dotenv";

dotEnvConfig();

const app = express();
app.use(cors());

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost:27017/mpnChatDB";

console.log('mongoUrl: ', mongoUrl);

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

// app.use((req: express.Request, _res: express.Response, next: express.NextFunction) => {
//   console.log(`${req.method} ${req.originalUrl}`);

//   next();
// });

app.use(loggerMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);

const port = process.env.PORT || 3333;
app.listen(port, () => {
  console.log(`[MPN Chat API] Listen on http://localhost:${port}`);
});
