import "jasmine";

import { expressRequestMock, expressValidationImperativelyMock } from "../../_mocks/HelperMocks";
import { messageListValidator, messageCreateValidator } from "../../../src/middlewares/validators/MessageValidator";
import { errorMessages } from "../../../src/helpers/Constants";
import { User } from "../../../src/models/User";

let request: any;
let spyModel: any;

beforeEach(() => {
  request = expressRequestMock.init();
  spyModel = spyOn(User, "exists");
})

describe("MessageListValidator", () => {

  it("- Happy Path", async () => {
    //Arrange
    spyModel.and.resolveTo(true);
    const expectedErrors = [];
    request.query = { userTo: "5e677d29991d8f4d664d571d", userFrom: "5e67f5fec9974b7a88eec739" };

    //Act
    const { errorsCount, errors } = await expressValidationImperativelyMock(messageListValidator, request);

    //Assert
    expect(errorsCount).toEqual(expectedErrors.length);
    expect(errors).toEqual(expectedErrors);
  })

  it("- Unhappy Path - Empty Request", async () => {
    //Arrange
    spyModel.and.resolveTo(true);
    const expectedErrors = [
      { value: undefined, location: "query", msg: errorMessages.isRequired, param: "userTo" },
      { value: undefined, location: "query", msg: errorMessages.isRequired, param: "userFrom" },
    ] as any;

    //Act
    const { errorsCount, errors } = await expressValidationImperativelyMock(messageListValidator, request);

    expect(errorsCount).toEqual(expectedErrors.length);
    expect(errors).toEqual(expectedErrors);
  })

  it("- Unhappy Path - User not exists", async () => {
    //Arrange
    spyModel.and.resolveTo(false);
    request.query = { userTo: "5e677d29991d8f4d664d571d", userFrom: "5e67f5fec9974b7a88eec739" };

    const expectedErrors = [
      { value: "5e677d29991d8f4d664d571d", location: "query", msg: errorMessages.isNotFound, param: "userTo" },
      { value: "5e67f5fec9974b7a88eec739", location: "query", msg: errorMessages.isNotFound, param: "userFrom" },
    ] as any;


    //Act
    const { errorsCount, errors } = await expressValidationImperativelyMock(messageListValidator, request);

    expect(spyModel).toHaveBeenCalled();
    expect(spyModel).toHaveBeenCalledTimes(2);
    expect(errorsCount).toEqual(expectedErrors.length);
    expect(errors).toEqual(expectedErrors);
  })
})

describe("MessageCreateValidator", () => {
  it("- Happy Path", async () => {
    //Arrange
    spyModel.and.resolveTo(true);
    const expectedErrors = [];
    request.body = { userTo: "5e677d29991d8f4d664d571d", userFrom: "5e67f5fec9974b7a88eec739", content: "content message" };

    //Act
    const { errorsCount, errors } = await expressValidationImperativelyMock(messageCreateValidator, request);

    //Assert
    expect(errorsCount).toEqual(expectedErrors.length);
    expect(errors).toEqual(expectedErrors);
  })

  it("- Unhappy Path - Empty Request", async () => {
    //Arrange
    spyModel.and.resolveTo(true);
    const expectedErrors = [
      { value: undefined, location: "body", msg: errorMessages.isRequired, param: "content" },
      { value: undefined, location: "body", msg: errorMessages.isRequired, param: "userTo" },
      { value: undefined, location: "body", msg: errorMessages.isRequired, param: "userFrom" },
    ] as any;

    //Act
    const { errorsCount, errors } = await expressValidationImperativelyMock(messageCreateValidator, request);

    expect(errorsCount).toEqual(expectedErrors.length);
    expect(errors).toEqual(expectedErrors);
  })

  it("- Unhappy Path - User not exists", async () => {
    //Arrange
    spyModel.and.resolveTo(false);
    request.body = { userTo: "5e677d29991d8f4d664d571d", userFrom: "5e67f5fec9974b7a88eec739", content: "content message" };

    const expectedErrors = [
      { value: "5e677d29991d8f4d664d571d", location: "body", msg: errorMessages.isNotFound, param: "userTo" },
      { value: "5e67f5fec9974b7a88eec739", location: "body", msg: errorMessages.isNotFound, param: "userFrom" },
    ] as any;

    //Act
    const { errorsCount, errors } = await expressValidationImperativelyMock(messageCreateValidator, request);

    expect(spyModel).toHaveBeenCalled();
    expect(spyModel).toHaveBeenCalledTimes(2);
    expect(errorsCount).toEqual(expectedErrors.length);
    expect(errors).toEqual(expectedErrors);
  })
})
