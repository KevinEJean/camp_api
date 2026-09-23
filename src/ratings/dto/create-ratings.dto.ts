import { IsString, IsNotEmpty, IsNumber, Min, Max, IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Locations } from "../../locations/entities/locations.entity.js";

export class RatingsCreateDto {

    @ApiProperty({
        description: 'Identifiant unique du lieu associé',
        example: 'plc_01ABC123',
    })
    @IsNotEmpty()
    placeId!: Locations['_id'];

    @ApiProperty({
        description: "Nom de l'auteur qui soumet l'évaluation",
        example: 'Jean Dupont',
    })
    @IsString()
    @IsNotEmpty()
    authorName!: string;

    @ApiProperty({
        description: 'Note attribuée au lieu',
        minimum: 0,
        maximum: 10,
    })
    @IsNumber()
    @Min(0)
    @Max(10)
    rating!: number;

    @ApiProperty({
        description: "Commentaire laissé par l'utilisateur",
        example: 'Excellente ambiance, Wi-Fi rapide et café de qualité supérieure !',
    })
    @IsString()
    @IsNotEmpty()
    comment!: string;
}