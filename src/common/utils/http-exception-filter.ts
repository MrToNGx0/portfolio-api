import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ResponseDto } from '../dto/response.dto';
import { createErrorResponse, ERROR_MESSAGES } from './constants';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = exception.getStatus
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;
    const exceptionResponse = exception.getResponse
      ? exception.getResponse()
      : {};

    const errorResponse =
      typeof exceptionResponse === 'string'
        ? { message: exceptionResponse }
        : exceptionResponse;

    const message =
      errorResponse['message'] || ERROR_MESSAGES.DEFAULT_ERROR_MESSAGE;
    const error =
      errorResponse['error'] ||
      (status === HttpStatus.NOT_FOUND
        ? ERROR_MESSAGES.NOT_FOUND
        : ERROR_MESSAGES.INTERNAL_SERVER_ERROR);

    const responseDto: ResponseDto<null> = createErrorResponse(
      status,
      message,
      error,
      request.url,
    );

    response.status(status).json(responseDto);
  }
}
