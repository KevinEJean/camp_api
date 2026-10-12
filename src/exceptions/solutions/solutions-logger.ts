export interface ExceptionSolution {
    match: (exception: unknown) => boolean;
    solution: string;
}

export const EXCEPTION_SOLUTION: ExceptionSolution[] = [
    {
        match: (e: any) => e?.status === 400,
        solution: 'The request was invalid. Check that all required fields are present and correctly formatted, then try again.',
    },
    {
        match: (e: any) => e?.status === 404,
        solution: 'The requested resource was not found. Verify the ID, URL or Method is correct and that the resource has not been deleted.',
    },
    {
        match: (e: any) => e?.status === 409,
        solution: 'The request conflicts with the current state of the resource (ex.: deleting a location with reviews). Refresh the data and retry.',
    },
    {
        match: (e: any) => e?.status === 422,
        solution: 'The request was well-formed but failed validation (ex.: trying to duplicate location with POST). Review the field values against the expected rules and correct any invalid input.',
    },
    {
        match: (e: any) => e?.statusCode === 500,
        solution: 'An unexpected server error occurred. Wait a moment and retry; if it keeps happening, contact support with the request details.',
    }
];

export function findSolution(exception: unknown): string | undefined {
    return EXCEPTION_SOLUTION.find((ex) => ex.match(exception))?.solution;
}