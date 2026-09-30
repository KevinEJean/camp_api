import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { ProblemsDto } from '../problems.dto.js';

@Catch(HttpException)
export class ProblemsDefault implements ExceptionFilter {

    catch(exception: any, host: ArgumentsHost) {
    
        const context = host.switchToHttp();
        const response = context.getResponse<Response>();
        const status = exception.getStatus();
        const exceptionResponse = exception.getResponse();

        const problemDetails: ProblemsDto = {
            type: 'about:blank',
            title: HttpStatus[status] || 'Internal Server Error',
            status: status,
            detail:
                typeof exceptionResponse === 'string'
                    ? exceptionResponse
                    : (exceptionResponse as any).message || 'An unexpected error occurred',
            instance: context.getRequest().url,
            errors: (exceptionResponse as any).errors || undefined,
        };

        response.status(status).json(problemDetails);
    }
}