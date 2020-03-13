import { app } from "./application/App";

export class Server {
  constructor() {
    const port = process.env.PORT || 3333;

    app.express.listen(port, () => {
      console.log(`[MPN Chat API] Listen on http://localhost:${port}`);
    });
  }
}

export const server = new Server();
