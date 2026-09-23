export class LocationsResponseDto {
    code!: number;
    name?: string;
    description?: string;
    category?: string;
    address?: string;
    services?: string[];
    status?: string;
    createdAt?: string;
    updatedAt?: string;
}