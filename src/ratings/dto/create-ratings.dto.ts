import { Locations } from "../../locations/entities/locations.entity.js";

export class RatingsCreateDto {
    placeId!: Locations['_id'];
    authorName!: string;
    rating!: number;
    comment!: string;
}