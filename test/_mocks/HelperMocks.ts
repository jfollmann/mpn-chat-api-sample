import "jasmine";
import { validationResult } from "express-validator";

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
  body: {},

  init() {
    this.query = {};
    this.params = {};
    this.body = {};

    // hack to remove context of express-validator
    if (this['express-validator#contexts']) {
      delete this['express-validator#contexts'];
    }

    return expressRequestMock;
  }
}

export const expressValidationImperativelyMock = async (validations: any, req: any) => {
  await Promise.all(validations.map((val: any) => val.run(req)));

  const result = validationResult(req);
  const errors = result.array();

  return { hasErrors: errors.length > 0, errorsCount: errors.length, errors };
}

export const spyRequest = () => {
  const spyStatus = spyOn(expressResponseMock, "status").and.returnValue(expressResponseMock);
  const spyJson = spyOn(expressResponseMock, "json").and.returnValue(expressResponseMock);
  const spySend = spyOn(expressResponseMock, "send").and.returnValue(expressResponseMock);

  return { spyStatus, spyJson, spySend };
}
