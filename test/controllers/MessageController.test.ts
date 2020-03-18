import "jasmine";

import { Message } from "../../src/models/Message";
import { MessageController } from "../../src/controllers/MessageController";
import { expressRequestMock, expressResponseMock, spyRequest } from "../_mocks/HelperMocks";
import { OK, INTERNAL_SERVER_ERROR, NOT_FOUND } from "http-status-codes";
import { BaseController } from "../../src/controllers/base/BaseController";

describe("Message Controller", () => {

  let request: any;
  beforeEach(() => {
    request = expressRequestMock.init();
  })

  const db = [{
    _id: "5e6b6d38c00f913074fa58b5", userTo: "5e67f5fec9974b7a88eec739", userFrom: "5e677d29991d8f4d664d571d",
    content: "send a message?", createdAt: "2020-03-13T11:23:36.152Z", updatedAt: "2020-03-13T11:23:36.152Z", __v: 0
  },
  {
    _id: "5e6f787b7d81156cc81692f1", userTo: "5e677d29991d8f4d664d571d", userFrom: "5e67f5fec9974b7a88eec739",
    content: "response a message", createdAt: "2020-03-16T13:00:43.074Z", updatedAt: "2020-03-16T13:00:43.074Z", __v: 0
  }];

  describe("Index", () => {
    it("- Happy Path", async () => {
      //Arrange
      const { spyStatus, spyJson } = spyRequest();
      const spyModel = spyOn(Message, "find").and.returnValue(Promise.resolve(db) as any);
      request.query = { userTo: "1", userFrom: "2" };

      //Act
      const controller = new MessageController();
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
      const spyModel = spyOn(Message, "find").and.returnValue(Promise.reject(responseExpected) as any);

      //Act
      const controller = new MessageController();
      await controller.index(request as any, expressResponseMock as any);

      //Assert
      expect(spyStatus).toHaveBeenCalled();
      expect(spyStatus).toHaveBeenCalledWith(INTERNAL_SERVER_ERROR);
      expect(spyJson).toHaveBeenCalled();
      expect(spyJson).toHaveBeenCalledWith(responseExpected);
      expect(spyModel).toHaveBeenCalled();
    })

    it("- Unhappy Path (Has error)", async () => {
      //Arranged

      const { spyStatus, spyJson } = spyRequest();
      const spyModel = spyOn(Message, "find")

      //Act
      const controller = new MessageController();
      spyOn(controller, "hasError").and.returnValue(true);
      await controller.index(request as any, expressResponseMock as any);

      //Assert
      expect(spyStatus).not.toHaveBeenCalled();
      expect(spyJson).not.toHaveBeenCalled();
      expect(spyModel).not.toHaveBeenCalled();
    })
  })

  describe("Store", () => {
    it("- Happy Path", async () => {
      //Arrange
      const { spyStatus, spyJson } = spyRequest();
      const spyModel = spyOn(Message, "create").and.returnValue(Promise.resolve(db) as any);
      request.body = { userTo: "1", "userFrom": "2", content: "create a message" };

      //Act
      const controller = new MessageController();
      await controller.store(request as any, expressResponseMock as any);

      //Assert
      expect(spyStatus).toHaveBeenCalled();
      expect(spyStatus).toHaveBeenCalledWith(OK);
      expect(spyJson).toHaveBeenCalled();
      expect(spyJson).toHaveBeenCalledWith(db);
      expect(spyModel).toHaveBeenCalled();
      expect(spyModel).toHaveBeenCalledWith({ userTo: "1", "userFrom": "2", content: "create a message" });
    })

    it("- Unhappy Path (Bad error)", async () => {
      //Arrange
      const { spyStatus, spyJson } = spyRequest();
      const responseExpected = { message: "bad error" };
      const spyModel = spyOn(Message, "create").and.returnValue(Promise.reject(responseExpected) as any);

      //Act
      const controller = new MessageController();
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
      const spyModel = spyOn(Message, "create");

      //Act
      const controller = new MessageController();
      spyOn(controller, "hasError").and.returnValue(true);
      await controller.store(request as any, expressResponseMock as any);

      //Assert
      expect(spyStatus).not.toHaveBeenCalled();
      expect(spyJson).not.toHaveBeenCalled();
      expect(spyModel).not.toHaveBeenCalled();
    })
  })

  describe("Update", () => {
    it("- Happy Path", async () => {
      //Arrange
      const { spyStatus, spyJson } = spyRequest();
      const spyModel = spyOn(Message, "findByIdAndUpdate").and.returnValue(Promise.resolve(db) as any);
      request.params = { id: "123" };
      request.body = { content: "message date" };

      //Act
      const controller = new MessageController();
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
      const spyModel = spyOn(Message, "findByIdAndUpdate").and.returnValue(Promise.reject(responseExpected) as any);
      request.params = { id: "123" };

      //Act
      const controller = new MessageController();
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
      const spyModel = spyOn(Message, "findByIdAndUpdate");
      request.params = { id: "123" };

      //Act
      const controller = new MessageController();
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
      const spyModel = spyOn(Message, "findByIdAndUpdate").and.returnValue(Promise.resolve(null) as any);
      request.params = { id: "123" };
      request.body = { content: "message date" };

      //Act
      const controller = new MessageController();
      await controller.update(request as any, expressResponseMock as any);

      //Assert
      expect(spyStatus).toHaveBeenCalled();
      expect(spyStatus).toHaveBeenCalledWith(NOT_FOUND);
      expect(spySend).toHaveBeenCalled();
      expect(spyModel).toHaveBeenCalled();
    })
  })
})
