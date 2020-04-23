import {
    CallHandler,
    ExecutionContext, Inject,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import {AppLoggerService} from "./app-logger.service";
import { uuid } from 'uuidv4';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    constructor(@Inject(AppLoggerService) private readonly logger) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

        const ctx = `${context.getClass().name}::${context.getHandler().name}`;
        const req = context.switchToHttp().getRequest();
        const res = context.switchToHttp().getResponse();

        req.requestId = req.requestId ?? uuid();
        req.headers['ExecutionContext'] = ctx;

        const {
            requestId,
            correlationId,
            userId,
            originalUrl,
            method,
            params,
            query,
            body,
        } = req;

        this.logger.log(`Request (${Date.now()})`, ctx, { requestId, correlationId, userId, originalUrl, method, params, query, body });

        const now = Date.now();
        return next
            .handle()
            .pipe(tap((data) => {
                const statusCode = res.statusCode;
                this.logger.log(`Response (${Date.now() - now}ms)`, ctx, { requestId, statusCode, data});
            }));
    }


}
