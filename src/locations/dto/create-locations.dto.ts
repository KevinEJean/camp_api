import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Category } from "../enums/category.enum.js";
import { Status } from "../enums/status.enum.js";

export class LocationsCreateDto {
    @ApiProperty({
        description: "Nom de l'emplacement",
        example: 'Bibliothèque Centrale',
    })
    name!: string;

    @ApiProperty({
        description: "Description détaillée de l'emplacement",
        example: 'Espace de travail calme avec postes informatiques et salles de réunion.',
    })
    description!: string;

    @ApiProperty({
        description: "Catégorie de l'emplacement",
        enum: Category,
    })
    category!: Category;

    @ApiProperty({
        description: "Adresse physique de l'emplacement",
        example: "1234, rue de l'Université, Montréal, QC",
    })
    address!: string;

    @ApiPropertyOptional({
        description: 'Liste des services offerts sur place',
        example: ['Wi-Fi', 'Impression', "Salles d'étude"]
    })
    services?: string[];

    @ApiPropertyOptional({
        description: "Statut actuel de l'emplacement",
        enum: Status
    })
    status?: Status;
}