import { IsNumber, IsOptional, IsString, Min, Max, IsNotEmpty } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class RatingsUpdateDto {
    @ApiPropertyOptional({
        description: 'Note attribuée au lieu',
        minimum: 0,
        maximum: 10,
    })
    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(10)
    rating?: number;

    @ApiPropertyOptional({
        description: "Commentaire laissé par l'utilisateur",
        example: 'Très bon endroit, je recommande !',
    })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    comment?: string;
}