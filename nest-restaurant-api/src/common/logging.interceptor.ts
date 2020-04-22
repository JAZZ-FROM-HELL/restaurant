import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const {
            originalUrl,
            method,
            params,
            query,
            body,
        } = context.switchToHttp().getRequest();

        console.log(`Request: ${Date.now()}`, { originalUrl, method, params, query, body });

        const now = Date.now();
        return next
            .handle()
            .pipe(tap((data) => {
                const statusCode = context.switchToHttp().getResponse().statusCode;
                console.log(`After... ${Date.now() - now}ms`, { statusCode, data});
            }));
    }
}