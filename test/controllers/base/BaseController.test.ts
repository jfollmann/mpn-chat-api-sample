import { spyRequest, expressRequestMock, expressResponseMock, expressValidationMock } from "../../_mocks/HelperMocks";
import { BaseController } from "../../../src/controllers/base/BaseController";
import { UNPROCESSABLE_ENTITY } from "http-status-codes";

describe("Base Controller", () => {

  it("- HasError: False", () => {
    //Arrange
    const { spyStatus, spyJson } = spyRequest();
    const expectedResult = expressValidationMock(false);
    spyOn(BaseController.prototype, "validationRequest").and.returnValue(expectedResult as any);

    //Act
    const controller = new BaseController();
    const response = controller["hasError"](expressRequestMock as any, expressResponseMock as any);

    //Assert
    expect(spyStatus).not.toHaveBeenCalled();
    expect(spyJson).not.toHaveBeenCalled();
    expect(response).toBeFalse();
  })

  it("- HasError: True", () => {
    //Arrange
    const { spyStatus, spyJson } = spyRequest();
    const expectedResult = expressValidationMock(true);
    spyOn(BaseController.prototype, "validationRequest").and.returnValue(expectedResult as any);

    //Act
    const controller = new BaseController();
    const response = controller["hasError"](expressRequestMock as any, expressResponseMock as any);

    //Assert
    expect(spyStatus).toHaveBeenCalled();
    expect(spyStatus).toHaveBeenCalledWith(UNPROCESSABLE_ENTITY);
    expect(spyJson).toHaveBeenCalled();
    expect(spyJson).toHaveBeenCalledWith({ errors: expectedResult.errors });
    expect(response).toBeTrue();
  })
})
