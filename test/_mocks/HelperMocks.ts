import "jasmine";

export const expressResponseMock = {
  status: (status: any): any => expressResponseMock,
  json: (body: any): any => expressResponseMock,
  send: (body: any): any => expressResponseMock
};

export const expressNextFunctionMock = {
  next: (): any => { }
}

export const expressRequestMock = {
  query: {},
  params: {},
  body: {}
}

export const dbMock = {
  connect: (): any => { }
}

export const expressValidationMock = (withErrors: boolean) => {
  const errors = withErrors
    ? [
      { value: "123", msg: "not found", param: "field", location: "body" },
      { value: "456", msg: "not found", param: "field", location: "body" }
    ]
    : [];

  return { errors, isEmpty: () => errors.length === 0, array: () => errors };
};


export const spyRequest = () => {
  const spyStatus = spyOn(expressResponseMock, "status").and.returnValue(expressResponseMock);
  const spyJson = spyOn(expressResponseMock, "json").and.returnValue(expressResponseMock);
  const spySend = spyOn(expressResponseMock, "send").and.returnValue(expressResponseMock);

  return { spyStatus, spyJson, spySend };
}




