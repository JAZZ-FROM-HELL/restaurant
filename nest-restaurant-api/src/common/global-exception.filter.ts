import {Catch, ExceptionFilter, ArgumentsHost, HttpException, HttpStatus, Inject, HttpServer} from '@nestjs/common';
import {AppLoggerService} from "./app-logger.service";
import {BaseExceptionFilter} from "@nestjs/core";

@Catch()
export class GlobalExceptionFilter extends BaseExceptionFilter {
    constructor(@Inject(AppLoggerService) private readonly logger) {
        super();
    }

    catch(exception: Error, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const req = ctx.getRequest();
        const res = ctx.getResponse();

        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        const attributes = {
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: res.url,
            requestPath: req.url,
            requestHeaders: req.headers,
            requestBody: req.body,
        };

        const executionContext = req.headers['ExecutionContext'];

        if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
            this.logger.error(`${exception.name}: ${exception.message}`, exception.stack, executionContext, attributes);
        } else if (status >= 400 && status < 500 ) {
            this.logger.warn(`${exception.name}: ${exception.message}`, executionContext, attributes);
        }

        super.catch(exception, host);
    }
}
