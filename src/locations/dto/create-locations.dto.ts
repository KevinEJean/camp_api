import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString} from 'class-validator';
import { Category } from "../enums/category.enum.js";
import { Status } from "../enums/status.enum.js";

export class LocationsCreateDto {
    @ApiProperty({
        description: "Nom de l'emplacement",
        example: 'Bibliothèque Centrale',
    })
    @IsString()
    @IsNotEmpty()
    name!: string;

    @ApiProperty({
        description: "Description détaillée de l'emplacement",
        example: 'Espace de travail calme avec postes informatiques et salles de réunion.',
    })
    @IsString()
    @IsNotEmpty()
    description!: string;

    @ApiProperty({
        description: "Catégorie de l'emplacement",
        enum: Category,
    })
    @IsString()
    @IsNotEmpty()
    category!: Category;

    @ApiProperty({
        description: "Adresse physique de l'emplacement",
        example: "1234, rue de l'Université, Montréal, QC",
    })
    @IsString()
    @IsNotEmpty()
    address!: string;

    @ApiPropertyOptional({
        description: 'Liste des services offerts sur place',
        example: ['Wi-Fi', 'Impression', "Salles d'étude"]
    })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    services?: string[];

    @ApiPropertyOptional({
        description: "Statut actuel de l'emplacement",
        enum: Status
    })
    @IsOptional()
    @IsString()
    status?: Status;
}