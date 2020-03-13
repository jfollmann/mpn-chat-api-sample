import "jasmine";

import { HelloRoutes } from "../../../src/routes/HelloRoutes";
import { helloController } from "../../../src/controllers/HelloController";
import { expressResponseMock } from "../mocks/HelperMocks";
import { OK } from "http-status-codes";

describe("Hello Route: Happy Path", () => {

  it("Say Hello", () => {
    // Arrange
    const spyStatus = spyOn(expressResponseMock, "status").and.returnValue(expressResponseMock);
    const spyJson = spyOn(expressResponseMock, "json").and.returnValue(expressResponseMock);

    const controllerResponse = expressResponseMock.status(OK).json({ value: "Say Hello" });
    const spyController = spyOn(helloController, "index").and.returnValue(controllerResponse);

    // Act
    const helloRoutes = new HelloRoutes();
    helloRoutes.index({} as any, expressResponseMock as any);

    //Assert
    expect(spyStatus).toHaveBeenCalled();
    expect(spyStatus).toHaveBeenCalledWith(OK);
    expect(spyJson).toHaveBeenCalled();
    expect(spyJson).toHaveBeenCalledWith({ value: "Say Hello" });
    expect(spyController).toHaveBeenCalled();
  })
})
