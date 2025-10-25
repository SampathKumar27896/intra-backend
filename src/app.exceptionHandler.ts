import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  BadRequestException,
} from "@nestjs/common";
import { Request, Response } from "express";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = "Internal server error";
    //console.log(exception);
    // Handle HTTP exceptions
    if (exception instanceof BadRequestException) {
      status = exception.getStatus();
      message = exception.message;
    }
    // Handle non-HTTP errors
    else if (exception instanceof Error) {
      message = exception.message;
    }
    console.log("Exception coming here", exception);
    // Send formatted error response
    response.status(status).json({
      status: false,
      statusCode: status,
      data: [],
      message,
    });
  }
}
