import { App } from "../src/application/App";

jest.mock("express", () => {
  return require("jest-express");
});

describe("Happy Path", () => {
  it("Should be configure express", () => {
    const app = new App();

    expect(app.express.use).toHaveBeenCalled();
  })
})



