import "jasmine";

import { expressNextFunctionMock } from "../_mocks/HelperMocks";
import { loggerMiddleware } from "../../src/middlewares/LoggerMiddleware";

describe("Logger Middleware", () => {
  it("Happy Path", () => {
    //Arrange
    const spyNextFunction = spyOn(expressNextFunctionMock, "next");
    const spyConsole = spyOn(console, "log");

    //Act
    loggerMiddleware({} as any, {} as any, spyNextFunction as any)

    //Assert
    expect(spyNextFunction).toHaveBeenCalled();
    expect(spyConsole).toHaveBeenCalled();
  })
})
