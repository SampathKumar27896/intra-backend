import { AllExceptionsFilter } from "./app.exceptionHandler";
import { BadRequestException, ArgumentsHost } from "@nestjs/common";

describe("Test AllExceptionsFilter", () => {
  const mockJson = jest.fn();
  const mockStatus = jest.fn(() => ({ json: mockJson }));
  const mockGetResponse = jest.fn(() => ({ status: mockStatus }));
  const host = {
    switchToHttp: jest.fn().mockReturnValue({
      getResponse: mockGetResponse,
      getRequest: jest.fn(),
    }),
  } as Partial<ArgumentsHost> as ArgumentsHost;
  beforeAll(() => {
    jest.clearAllMocks();
  });
  test(`Check Response message "Invalid Argumets", status code 400 when the BadRequest exception occurs`, () => {
    const exceptionFilter = new AllExceptionsFilter();
    const exception = new BadRequestException("Invalid arguments");
    exceptionFilter.catch(exception, host);
    const mockResponse = {
      status: false,
      statusCode: 400,
      data: [],
      message: "Invalid arguments",
    };
    expect(mockGetResponse).toHaveBeenCalled();
    expect(mockStatus).toHaveBeenCalledWith(400);
    expect(mockJson).toHaveBeenCalledWith(mockResponse);
  });

  test(`Check Response message "Something wrong", status code 500 when the unhandled Error occurs`, () => {
    const exceptionFilter = new AllExceptionsFilter();
    const unhandledError = new Error("Something wrong");
    exceptionFilter.catch(unhandledError, host);
    const mockResponse = {
      status: false,
      statusCode: 500,
      data: [],
      message: unhandledError.message,
    };
    expect(mockGetResponse).toHaveBeenCalled();
    expect(mockStatus).toHaveBeenCalledWith(500);
    expect(mockJson).toHaveBeenCalledWith(mockResponse);
  });

  test(`Check default response message when non-Error, non-HttpException exception occurs`, () => {
    const exceptionFilter = new AllExceptionsFilter();
    const unknownException = { detail: "Unknown issue" };
    exceptionFilter.catch(unknownException, host);
    const mockResponse = {
      status: false,
      statusCode: 500,
      data: [],
      message: "Internal Server Error",
    };
    expect(mockGetResponse).toHaveBeenCalled();
    expect(mockStatus).toHaveBeenCalledWith(500);
    expect(mockJson).toHaveBeenCalledWith(mockResponse);
  });
});
