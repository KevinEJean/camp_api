import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { ExceptionDto } from '../exception.dto.js';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {

    catch(exception: HttpException, host: ArgumentsHost) {
    
        const context = host.switchToHttp();
        const response = context.getResponse<Response>();
        const request = context.getRequest<Request>();
        const status = exception.getStatus();
        const exceptionResponse = exception.getResponse();

        var type = "about:blank";
        if (request.url.includes("locations"))
            type = "locations";
        else if (request.url.includes("ratings"))
            type = "ratings";

        const problemDetails: ExceptionDto = {
            type: type,
            title: HttpStatus[status] || 'Error',
            status: status,
            detail:
                typeof exceptionResponse === 'string'
                    ? exceptionResponse
                    : (exceptionResponse as any).message || 'An error occurred',
            instance: request.url,
            errors: (exceptionResponse as any).errors || undefined,
        };

        response.status(status).json(problemDetails);
    }
}