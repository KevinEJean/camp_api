import { Category } from "../enums/category.enum.js";
import { Status } from "../enums/status.enum.js";

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