import { IsString, IsNotEmpty, IsNumber, Min, Max, IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
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