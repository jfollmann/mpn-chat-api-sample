import * as express from "express";
import { App } from "../../src/application/App";
import { db } from "../../src/models/Database";

describe("App: Happy Path", () => {
  it("App Constructor", () => {
    const spyConfig = spyOn(App.prototype, "config");

    const spyDb = spyOn(db, "connect");

    const target = new App();

    expect(target).toBeInstanceOf(App);
    expect(spyConfig).toHaveBeenCalled();
    expect(spyDb).toHaveBeenCalled();
  })

  it("Config", () => {
    const spyUse = spyOn(express.application, "use");

    const target = new App();

    expect(target).toBeInstanceOf(App);
    expect(spyUse).toHaveBeenCalled();
  })
})
