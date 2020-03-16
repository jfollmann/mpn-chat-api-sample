import "jasmine";

export const expressResponseMock = {
  status: (status: any): any => expressResponseMock,
  json: (body: any): any => expressResponseMock,
  send: (body: any): any => expressResponseMock
};

export const expressRequestMock = {
  query: {},
  params: {},
  body: {}
}

export const dbMock = {
  connect: (): any => { }
}

export const spyRequest = () => {
  const spyStatus = spyOn(expressResponseMock, "status").and.returnValue(expressResponseMock);
  const spyJson = spyOn(expressResponseMock, "json").and.returnValue(expressResponseMock);
  const spySend = spyOn(expressResponseMock, "send").and.returnValue(expressResponseMock);

  return { spyStatus, spyJson, spySend };
}




