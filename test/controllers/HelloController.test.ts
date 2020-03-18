import "jasmine";

import { HelloController } from "../../src/controllers/HelloController";
import { expressResponseMock, expressRequestMock } from "../_mocks/HelperMocks";
import { OK } from "http-status-codes";

describe("Hello Controller", () => {

  let request: any;
  beforeEach(() => {
    request = expressRequestMock.init();
  })

  it("- Say Hello Happy Path", async () => {
    //Arrange
    const spyStatus = spyOn(expressResponseMock, "status").and.returnValue(expressResponseMock);
    const spyJson = spyOn(expressResponseMock, "json").and.returnValue(expressResponseMock);

    //Act
    const controller = new HelloController();
    controller.index(request as any, expressResponseMock as any);

    //Assert
    expect(spyStatus).toHaveBeenCalled();
    expect(spyStatus).toHaveBeenCalledWith(OK);
    expect(spyJson).toHaveBeenCalled();
    expect(spyJson).toHaveBeenCalledWith({ value: "Hello World" });
  })
})
