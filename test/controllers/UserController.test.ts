import "jasmine";

import { User } from "../../src/models/User";
import { UserController } from "../../src/controllers/UserController";
import { expressRequestMock, expressResponseMock, spyRequest } from "../_mocks/HelperMocks";
import { OK, INTERNAL_SERVER_ERROR, NOT_FOUND, NO_CONTENT } from "http-status-codes";

let request: any;
beforeEach(() => {
  request = expressRequestMock.init();
})
const db = [{
  _id: "5e677d29991d8f4d664d571d", name: "user 1", email: "user1@e.mail",
  createdAt: "2020-03-10T11:42:33.164Z", updatedAt: "2020-03-10T11:42:33.164Z", __v: 0
}];

describe("User Controller", () => {

  describe("Index", () => {
    it("- Happy Path", async () => {
      //Arrange
      const { spyStatus, spyJson } = spyRequest();
      const spyModel = spyOn(User, "find").and.resolveTo(Promise.resolve(db) as any);

      //Act
      const controller = new UserController();
      await controller.index(request as any, expressResponseMock as any);

      //Assert
      expect(spyStatus).toHaveBeenCalled();
      expect(spyStatus).toHaveBeenCalledWith(OK);
      expect(spyJson).toHaveBeenCalled();
      expect(spyJson).toHaveBeenCalledWith(db);
      expect(spyModel).toHaveBeenCalled();
    })

    it("- Unhappy Path (Bad error)", async () => {
      //Arrange
      const { spyStatus, spyJson } = spyRequest();
      const responseExpected = { message: "bad error" };
      const spyModel = spyOn(User, "find").and.returnValue(Promise.reject(responseExpected) as any);

      //Act
      const controller = new UserController();
      await controller.index(request as any, expressResponseMock as any);

      //Assert
      expect(spyStatus).toHaveBeenCalled();
      expect(spyStatus).toHaveBeenCalledWith(INTERNAL_SERVER_ERROR);
      expect(spyJson).toHaveBeenCalled();
      expect(spyJson).toHaveBeenCalledWith(responseExpected);
      expect(spyModel).toHaveBeenCalled();
    })
  })


  describe("Store", () => {
    it("- Happy Path", async () => {
      //Arrange
      const { spyStatus, spyJson } = spyRequest();
      const spyModel = spyOn(User, "create").and.returnValue(Promise.resolve(db) as any);
      request.body = { name: "user 3", email: "user3@e.mail" };

      //Act
      const controller = new UserController();
      await controller.store(request as any, expressResponseMock as any);

      //Assert
      expect(spyStatus).toHaveBeenCalled();
      expect(spyStatus).toHaveBeenCalledWith(OK);
      expect(spyJson).toHaveBeenCalled();
      expect(spyJson).toHaveBeenCalledWith(db);
      expect(spyModel).toHaveBeenCalled();
      expect(spyModel).toHaveBeenCalledWith({ name: "user 3", email: "user3@e.mail" });
    })

    it("- Unhappy Path (Bad error)", async () => {
      //Arrange
      const { spyStatus, spyJson } = spyRequest();
      const responseExpected = { message: "bad error" };
      const spyModel = spyOn(User, "create").and.returnValue(Promise.reject(responseExpected) as any);

      //Act
      const controller = new UserController();
      await controller.store(request as any, expressResponseMock as any);

      //Assert
      expect(spyStatus).toHaveBeenCalled();
      expect(spyStatus).toHaveBeenCalledWith(INTERNAL_SERVER_ERROR);
      expect(spyJson).toHaveBeenCalled();
      expect(spyJson).toHaveBeenCalledWith(responseExpected);
      expect(spyModel).toHaveBeenCalled();
    })

    it("- Unhappy Path (Has error)", async () => {
      //Arrange
      const { spyStatus, spyJson } = spyRequest();
      const spyModel = spyOn(User, "create");

      //Act
      const controller = new UserController();
      spyOn(controller, "hasError").and.returnValue(true);
      await controller.store(request as any, expressResponseMock as any);

      //Assert
      expect(spyStatus).not.toHaveBeenCalled();
      expect(spyJson).not.toHaveBeenCalled();
      expect(spyModel).not.toHaveBeenCalled();
    })
  })

  describe("Show", () => {
    it("- Happy Path", async () => {
      //Arrange
      const { spyStatus, spyJson } = spyRequest();
      const spyModel = spyOn(User, "findById").and.returnValue(Promise.resolve(db) as any);
      request.params = { id: "123" };

      //Act
      const controller = new UserController();
      await controller.show(request as any, expressResponseMock as any);

      //Assert
      expect(spyStatus).toHaveBeenCalled();
      expect(spyStatus).toHaveBeenCalledWith(OK);
      expect(spyJson).toHaveBeenCalled();
      expect(spyJson).toHaveBeenCalledWith(db);
      expect(spyModel).toHaveBeenCalled();
    })

    it("- Unhappy Path (Bad error)", async () => {
      //Arrange
      const { spyStatus, spyJson } = spyRequest();
      const responseExpected = { message: "bad error" };
      const spyModel = spyOn(User, "findById").and.returnValue(Promise.reject(responseExpected) as any);
      request.params = { id: "123" };

      //Act
      const controller = new UserController();
      await controller.show(request as any, expressResponseMock as any);

      //Assert
      expect(spyStatus).toHaveBeenCalled();
      expect(spyStatus).toHaveBeenCalledWith(INTERNAL_SERVER_ERROR);
      expect(spyJson).toHaveBeenCalled();
      expect(spyJson).toHaveBeenCalledWith(responseExpected);
      expect(spyModel).toHaveBeenCalled();
    })

    it("- Unhappy Path (Not found)", async () => {
      //Arrange
      const { spyStatus, spySend } = spyRequest();
      const spyModel = spyOn(User, "findById").and.returnValue(Promise.resolve(null) as any);
      request.params = { id: "123" };

      //Act
      const controller = new UserController();
      await controller.show(request as any, expressResponseMock as any);

      //Assert
      expect(spyStatus).toHaveBeenCalled();
      expect(spyStatus).toHaveBeenCalledWith(NOT_FOUND);
      expect(spySend).toHaveBeenCalled();
      expect(spyModel).toHaveBeenCalled();
    })
  })

  describe("Update", () => {
    it("- Happy Path", async () => {
      //Arrange
      const { spyStatus, spyJson } = spyRequest();
      const spyModel = spyOn(User, "findByIdAndUpdate").and.returnValue(Promise.resolve(db) as any);
      request.params = { id: "123" };
      request.body = { name: "user 1", email: "user1@e.mail" };

      //Act
      const controller = new UserController();
      await controller.update(request as any, expressResponseMock as any);

      //Assert
      expect(spyStatus).toHaveBeenCalled();
      expect(spyStatus).toHaveBeenCalledWith(OK);
      expect(spyJson).toHaveBeenCalled();
      expect(spyJson).toHaveBeenCalledWith(db);
      expect(spyModel).toHaveBeenCalled();
    })

    it("- Unhappy Path (Bad error)", async () => {
      //Arrange
      const { spyStatus, spyJson } = spyRequest();
      const responseExpected = { message: "bad error" };
      const spyModel = spyOn(User, "findByIdAndUpdate").and.returnValue(Promise.reject(responseExpected) as any);
      request.params = { id: "123" };

      //Act
      const controller = new UserController();
      await controller.update(request as any, expressResponseMock as any);

      //Assert
      expect(spyStatus).toHaveBeenCalled();
      expect(spyStatus).toHaveBeenCalledWith(INTERNAL_SERVER_ERROR);
      expect(spyJson).toHaveBeenCalled();
      expect(spyJson).toHaveBeenCalledWith(responseExpected);
      expect(spyModel).toHaveBeenCalled();
    })

    it("- Unhappy Path (Has error)", async () => {
      //Arrange
      const { spyStatus, spyJson } = spyRequest();
      const spyModel = spyOn(User, "findByIdAndUpdate")
      request.params = { id: "123" };

      //Act
      const controller = new UserController();
      spyOn(controller, "hasError").and.returnValue(true);
      await controller.update(request as any, expressResponseMock as any);

      //Assert
      expect(spyStatus).not.toHaveBeenCalled();
      expect(spyJson).not.toHaveBeenCalled();
      expect(spyModel).not.toHaveBeenCalled();
    })

    it("- Unhappy Path (Not found)", async () => {
      //Arrange
      const { spyStatus, spySend } = spyRequest();
      const spyModel = spyOn(User, "findByIdAndUpdate").and.returnValue(Promise.resolve(null) as any);
      request.params = { id: "123" };

      //Act
      const controller = new UserController();
      await controller.update(request as any, expressResponseMock as any);

      //Assert
      expect(spyStatus).toHaveBeenCalled();
      expect(spyStatus).toHaveBeenCalledWith(NOT_FOUND);
      expect(spySend).toHaveBeenCalled();
      expect(spyModel).toHaveBeenCalled();
    })
  })

  describe("Destroy", () => {
    it("- Happy Path", async () => {
      //Arrange
      const { spyStatus, spyJson } = spyRequest();
      const spyModel = spyOn(User, "findByIdAndDelete").and.returnValue(Promise.resolve(db) as any);
      request.params = { id: "123" };

      //Act
      const controller = new UserController();
      await controller.destroy(request as any, expressResponseMock as any);

      //Assert
      expect(spyStatus).toHaveBeenCalled();
      expect(spyStatus).toHaveBeenCalledWith(NO_CONTENT);
      expect(spyJson).toHaveBeenCalled();
      expect(spyJson).toHaveBeenCalledWith(db);
      expect(spyModel).toHaveBeenCalled();
    })

    it("- Unhappy Path (Bad error)", async () => {
      //Arrange
      const { spyStatus, spyJson } = spyRequest();
      const responseExpected = { message: "bad error" };
      const spyModel = spyOn(User, "findByIdAndDelete").and.returnValue(Promise.reject(responseExpected) as any);
      request.params = { id: "123" };

      //Act
      const controller = new UserController();
      await controller.destroy(request as any, expressResponseMock as any);

      //Assert
      expect(spyStatus).toHaveBeenCalled();
      expect(spyStatus).toHaveBeenCalledWith(INTERNAL_SERVER_ERROR);
      expect(spyJson).toHaveBeenCalled();
      expect(spyJson).toHaveBeenCalledWith(responseExpected);
      expect(spyModel).toHaveBeenCalled();
    })

    it("- Unhappy Path (Not found)", async () => {
      //Arrange
      const { spyStatus, spySend } = spyRequest();
      const spyModel = spyOn(User, "findByIdAndDelete").and.returnValue(Promise.resolve(null) as any);
      request.params = { id: "123" };

      //Act
      const controller = new UserController();
      await controller.destroy(request as any, expressResponseMock as any);

      //Assert
      expect(spyStatus).toHaveBeenCalled();
      expect(spyStatus).toHaveBeenCalledWith(NOT_FOUND);
      expect(spySend).toHaveBeenCalled();
      expect(spyModel).toHaveBeenCalled();
    })
  })
})
