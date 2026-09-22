import { Locations } from "../../locations/entities/locations.entity.js";

export class RatingsResponseDto {
    code: number;
    placeId?: Locations['_id'];
    authorName?: string;
    rating?: number;
    comment?: string;
    createdAt?: string;
    updatedAt?: string;
}