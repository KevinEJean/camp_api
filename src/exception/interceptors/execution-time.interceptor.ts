import {
    CallHandler,
    ExecutionContext,
    Injectable,
    Logger,
    NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable()
export class ExecutionTimeInterceptor
    implements NestInterceptor {
    private readonly logger = new Logger(
        ExecutionTimeInterceptor.name,
    );

    intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Observable<unknown> {
        const request = context.switchToHttp().getRequest<{
            method: string;
            originalUrl: string;
        }>();

        const startedAt = Date.now();

        return next.handle().pipe(
            finalize(() => {
                const duration = Date.now() - startedAt;

                this.logger.log(
                    `${request.method} ${request.originalUrl} - ${duration} ms`,
                );
            }),
        );
    }
}