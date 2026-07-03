import { CallHandler, ExecutionContext } from "@nestjs/common";
import { of } from "rxjs";
import { ResponseInterceptor } from "./app.responseInterceptor";

describe("Response Interceptor", () => {
  let interceptor: ResponseInterceptor<any>;

  beforeEach(() => {
    interceptor = new ResponseInterceptor();
  });

  it("should format response correctly", (done) => {
    const context = {
      switchToHttp: jest.fn().mockReturnValue({
        getResponse: () => ({
          statusCode: 200,
        }),
      }),
    } as unknown as ExecutionContext;

    const next: CallHandler = {
      handle: jest.fn(() =>
        of({
          message: "Songs loaded",
          data: ["song1", "song2"],
        }),
      ),
    };
    interceptor.intercept(context, next).subscribe((result) => {
      expect(result).toEqual({
        status: true,
        statusCode: 200,
        message: "Songs loaded",
        data: ["song1", "song2"],
      });
    });
    done();
  });
});
