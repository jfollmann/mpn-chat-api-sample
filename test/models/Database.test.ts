// import "jasmine";
// import * as mongoose from "mongoose";
// import { Database } from "../../src/models/Database";

// describe("Database", () => {
//   it("- Constructor", () => {
//     const database = new Database();

//     expect(database.mongoUrl.length).not.toEqual(0);
//     expect(database.mongoUrl).toContain("mongodb://");
//   })

//   it("- Connect", () => {
//     const spyConnect = spyOn(mongoose, "connect")

//     const database = new Database();
//     database.mongoUrl = "mongodb://MONGO_CONNECTION";
//     database.options = {} as any;
//     database.connect();

//     expect(spyConnect).toHaveBeenCalled();
//     expect(spyConnect).toHaveBeenCalledWith("mongodb://MONGO_CONNECTION", {} as any);
//   })
// })
