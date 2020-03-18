import { spyRequest, expressRequestMock, expressResponseMock } from "../../_mocks/HelperMocks";
import { BaseController } from "../../../src/controllers/base/BaseController";
import { UNPROCESSABLE_ENTITY } from "http-status-codes";

describe("Base Controller", () => {

  const errorsMock = (withErrors: boolean) => {
    const errors = withErrors
      ? [
        { value: "123", msg: "not found", param: "field", location: "body" },
        { value: "456", msg: "not found", param: "field", location: "body" }
      ]
      : [];

    return { errors, isEmpty: () => errors.length === 0, array: () => errors };
  };


  it("- HasError: False", () => {
    //Arrange
    const { spyStatus, spyJson } = spyRequest();
    spyOn(BaseController.prototype, "validationRequest").and.returnValue(errorsMock(false) as any);

    //Act
    const controller = new BaseController();
    const response = controller["hasError"](expressRequestMock.init() as any, expressResponseMock as any);

    //Assert
    expect(spyStatus).not.toHaveBeenCalled();
    expect(spyJson).not.toHaveBeenCalled();
    expect(response).toBeFalse();
  })

  it("- HasError: True", () => {
    //Arrange
    const { spyStatus, spyJson } = spyRequest();
    const expectedResult = errorsMock(true);
    spyOn(BaseController.prototype, "validationRequest").and.returnValue(expectedResult as any);

    //Act
    const controller = new BaseController();
    const response = controller["hasError"](expressRequestMock.init() as any, expressResponseMock as any);

    //Assert
    expect(spyStatus).toHaveBeenCalled();
    expect(spyStatus).toHaveBeenCalledWith(UNPROCESSABLE_ENTITY);
    expect(spyJson).toHaveBeenCalled();
    expect(spyJson).toHaveBeenCalledWith({ errors: expectedResult.errors });
    expect(response).toBeTrue();
  })
})
