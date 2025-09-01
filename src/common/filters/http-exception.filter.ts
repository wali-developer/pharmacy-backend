import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status =
      exception instanceof HttpException ? exception.getStatus() : 500;
    // const exceptionResponse = exception.getResponse();

    // const message =
    //   exception instanceof HttpException
    //     ? exception.getResponse()
    //     : (exception as any)?.message || 'Internal server error';

    const error =
      exception instanceof HttpException
        ? exception.getResponse()
        : (exception as any)?.message || 'Internal server error';

    response.status(status).json({
      success: false,
      error: typeof error === 'string' ? error : error.message,
      status,
      path: request.url,
    });
  }
}
