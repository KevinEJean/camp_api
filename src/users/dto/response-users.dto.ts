import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class UsersResponseDto {
    @ApiProperty({
        description: "Code de statut du résultat de l'opération (ex. : 201 à la création, 204 à la suppression).",
        example: 201,
    })
    @IsNotEmpty()
    code!: number;

    @ApiPropertyOptional({
        description: "Identifiant unique de l'utilisateur (format usr_01XXXX00).",
        example: 'usr_01ABCD12',
    })
    @IsOptional()
    _id?: string;

    @ApiPropertyOptional({
        description: "Nom de l'utilisateur (unique).",
        example: 'jean_dupont',
    })
    @IsOptional()
    name?: string;

    @ApiPropertyOptional({
        description: "Date de création du compte.",
        example: '2026-10-14T16:40:00.000Z',
    })
    @IsOptional()
    createdAt?: Date;

    @ApiPropertyOptional({
        description: "Date de la dernière modification du compte.",
        example: '2026-10-14T16:40:00.000Z',
    })
    @IsOptional()
    updatedAt?: Date;
}