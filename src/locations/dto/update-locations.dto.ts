import { ApiPropertyOptional } from '@nestjs/swagger';
import { Category } from "../enums/category.enum.js";
import { Status } from "../enums/status.enum.js";
import { IsArray, IsOptional, IsString } from 'class-validator';

export class LocationsUpdateDto {
    @ApiPropertyOptional({
        description: "Nom de l'emplacement",
        example: 'Bibliothèque Centrale - Pavillon Ouest',
    })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiPropertyOptional({
        description: "Description détaillée de l'emplacement",
        example: 'Espace de travail réaménagé avec nouvelles salles de réunion réservables.',
    })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiPropertyOptional({
        description: "Catégorie de l'emplacement",
        enum: Category,
    })
    @IsOptional()
    @IsString()
    category?: Category;

    @ApiPropertyOptional({
        description: "Adresse physique de l'emplacement",
        example: "1234, rue de l'Université, Montréal, QC",
    })
    @IsOptional()
    @IsString()
    address?: string;

    @ApiPropertyOptional({
        description: 'Liste des services offerts sur place',
        example: ['Wi-Fi', 'Impression 3D', "Salles d'étude"]
    })
    @IsOptional()
    @IsArray()
    services?: string[];

    @ApiPropertyOptional({
        description: "Statut actuel de l'emplacement",
        enum: Status,
    })
    @IsOptional()
    status?: Status;
}