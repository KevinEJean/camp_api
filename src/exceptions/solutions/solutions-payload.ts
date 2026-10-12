// solutions/solutions-logger.ts
import { ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import type { Request } from 'express';
import { createLogger, format, transports } from 'winston';
import { findSolution } from './solutions-logger.js';

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp(),
        format.errors({ stack: true }),
        format.json(),
    ),
    transports: [new transports.Console()],
});

export function logException(exception: unknown, host: ArgumentsHost): void {
    const req = host.switchToHttp().getRequest<Request>();

    const status =
        exception instanceof HttpException
            ? exception.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;

    const description = exception instanceof Error ? exception.message : 'Unknown error';
    const stack = exception instanceof Error ? exception.stack : undefined;

    const payload = {
        message: description,
        statusCode: status,
        method: req.method,
        path: req.url,
        possibleSolution:
            findSolution(exception) ?? 'Unknown error - investigate the stack trace.',
    };

    if (status >= 500) logger.error({ ...payload, stack });
    else logger.warn(payload);
}