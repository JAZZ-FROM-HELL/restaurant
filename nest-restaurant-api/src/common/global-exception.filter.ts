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

        const optionsJson = {
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: res.url,
        };

        const requestId = req.requestId;
        const executionContext = req.headers['ExecutionContext'];

        if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
            this.logger.error(`${exception.name}: ${exception.message} on request ${requestId}`, exception.stack, executionContext, optionsJson);
        } else if (status >= 400 && status < 500 ) {
            this.logger.warn(`${exception.name}: ${exception.message} on request ${requestId}`, executionContext, optionsJson);
        }

        super.catch(exception, host);
    }
}
