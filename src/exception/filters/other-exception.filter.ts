import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus, InternalServerErrorException } from '@nestjs/common';
import { Response } from 'express';
import { ExceptionDto } from '../exception.dto.js';

@Catch(InternalServerErrorException)
export class OtherExceptionFilter implements ExceptionFilter {

    catch(exception: any, host: ArgumentsHost) {
    
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
            title: 'Internal Server Error',
            status: status,
            detail: 'An unexpected error occurred',
            instance: request.url,
            errors: (exceptionResponse as any).errors || undefined,
        };

        response.status(status).json(problemDetails);
    }
}