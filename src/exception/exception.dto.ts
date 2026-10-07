export class ExceptionDto {
    type: string;
    title: string;
    status: number;
    detail: string;
    instance: string;
    errors?: string[];
}