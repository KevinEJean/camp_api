import { Category } from "../enums/category.enum.js";
import { Status } from "../enums/status.enum.js";

export class LocationsUpdateDto {
    name?: string;
    description?: string;
    category?: Category;
    address?: string;
    services?: string[];
    status?: Status;
}