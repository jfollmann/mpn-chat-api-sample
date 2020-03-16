import "jasmine";
import { app } from "../src/application/App";
import { Server } from "../src/Server";

describe("Server", () => {
  it("- Constructor", () => {
    const spyListen = spyOn(app.express, "listen");

    const server = new Server();

    expect(spyListen).toHaveBeenCalled();
    expect(spyListen).toHaveBeenCalledTimes(1);
  })
})
