// import "jasmine";

// import { MessageRoutes } from "../../../src/routes/MessageRoutes";
// import { helloController as messageController } from "../../../src/controllers/HelloController";
// import { expressResponseMock } from "../mocks/HelperMocks";
// import { OK } from "http-status-codes";

// describe("Message Route: Happy Path", () => {

//   it("Index", () => {
//     // Arrange
//     const spyStatus = spyOn(expressResponseMock, "status").and.returnValue(expressResponseMock);
//     const spyJson = spyOn(expressResponseMock, "json").and.returnValue(expressResponseMock);

//     const spyRequest = { query: { userTo: 1, userFrom: 2 }};

//     const controllerResponse = expressResponseMock.status(OK).json({ });
//     const spyController = spyOn(messageController, "index").and.returnValue(controllerResponse);

//     // Act
//     const messageRoute = new MessageRoutes();
//     messageRoute.index(spyRequest as any, expressResponseMock as any);

//     //Assert
//     expect(spyStatus).toHaveBeenCalled();
//     expect(spyStatus).toHaveBeenCalledWith(OK);
//     expect(spyJson).toHaveBeenCalled();
//     expect(spyJson).toHaveBeenCalledWith({ });
//     expect(spyController).toHaveBeenCalled();
//   })
// })
