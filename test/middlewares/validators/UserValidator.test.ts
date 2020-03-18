import "jasmine";

import { userCreateValidator, userUpdateValidator } from "../../../src/middlewares/validators/UserValidator";
import { expressRequestMock, expressValidationImperativelyMock } from "../../_mocks/HelperMocks";
import { errorMessages } from "../../../src/helpers/Constants";

let request: any;

beforeEach(() => {
  request = expressRequestMock.init();
})

describe("UserCreateValidator", () => {

  it("- Happy Path", async () => {
    //Arrange
    const expectedErrors = [];
    request.body = { name: "user name", email: "user@e.mail.com" };

    //Act
    const { errorsCount, errors } = await expressValidationImperativelyMock(userCreateValidator, request);

    //Assert
    expect(errorsCount).toEqual(expectedErrors.length);
    expect(errors).toEqual(expectedErrors);
  })

  it("- Unhappy Path - Empty Request", async () => {
    //Arrange
    const expectedErrors = [
      { value: undefined, location: "body", msg: errorMessages.isRequired, param: "name" },
      { value: undefined, location: "body", msg: errorMessages.isRequired, param: "email" },
      { value: undefined, location: "body", msg: errorMessages.isInvalid, param: "email" }
    ] as any;

    request = expressRequestMock.init();

    //Act
    const { errorsCount, errors } = await expressValidationImperativelyMock(userCreateValidator, request);

    expect(errorsCount).toEqual(expectedErrors.length);
    expect(errors).toEqual(expectedErrors);
  })
})

describe("UserUpdateValidator", () => {
  it("- Happy Path", async () => {
    //Arrange
    const expectedErrors = [];
    request.body = { name: "user name", email: "user@e.mail.com" };

    //Act
    const { errorsCount, errors } = await expressValidationImperativelyMock(userUpdateValidator, request);

    //Assert
    expect(errorsCount).toEqual(expectedErrors.length);
    expect(errors).toEqual(expectedErrors);
  })
})
