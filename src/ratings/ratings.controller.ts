import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiResponse, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';
import { RatingsService } from './ratings.service.js';
import { RatingsResponseDto } from './dto/response-ratings.dto.js';
import { RatingsCreateDto } from './dto/create-ratings.dto.js';
import { RatingsUpdateDto } from './dto/update-ratings.dto.js';
import { Ratings } from './entities/ratings.entity.js';

@Controller('ratings')
export class RatingsController {

    private readonly service = new RatingsService();

    @Get()
    @ApiOperation({
        summary: 'Récupérer toutes les appréciations',
        description: 'Récupère la liste de toutes les appréciations existantes.'
    })
    @ApiResponse({
        status: 200,
        description: 'Liste des appréciations récupérée avec succès.'
    })
    findAll(): Ratings[] {
        return this.service.findAll();
    }

    @Get(':id')
    @ApiOperation({
        summary: 'Récupérer une appréciation par ID',
        description: 'Récupère une seule appréciation à partir de son identifiant unique.'
    })
    @ApiParam({
        name: 'id',
        description: "Identifiant unique de l'appréciation",
        example: '123e4567-e89b-12d3-a456-426614174000'
    })
    @ApiResponse({
        status: 200,
        description: 'Appréciation trouvée avec succès.',
        type: RatingsResponseDto
    })
    @ApiResponse({
        status: 404,
        description: 'Appréciation introuvable.'
    })
    findOne(@Param('id') id: string): RatingsResponseDto {
        return this.service.findOne(id);
    }

    @Post()
    @ApiOperation({
        summary: 'Créer une nouvelle appréciation',
        description: 'Crée une nouvelle appréciation à partir des données fournies.'
    })
    @ApiBody({
        type: RatingsCreateDto
    })
    @ApiResponse({
        status: 201,
        description: 'Appréciation créée avec succès.',
        type: RatingsResponseDto
    })
    @ApiResponse({
        status: 400,
        description: 'Requête incorrecte / Erreur de validation.'
    })
    create(@Body() dto: RatingsCreateDto): RatingsResponseDto {
        return this.service.create(dto);
    }

    @Patch(':id')
    @ApiOperation({
        summary: 'Mettre à jour une appréciation existante',
        description: "Met à jour partiellement les champs d'une appréciation spécifique."
    })
    @ApiParam({
        name: 'id',
        description: "Identifiant unique de l'appréciation à mettre à jour"
    })
    @ApiBody({
        type: RatingsUpdateDto
    })
    @ApiResponse({
        status: 200,
        description: 'Appréciation mise à jour avec succès.',
        type: RatingsResponseDto
    })
    @ApiResponse({
        status: 400,
        description: 'Requête incorrecte / Données invalides.'
    })
    @ApiResponse({
        status: 404,
        description: 'Appréciation introuvable.'
    })
    update(
        @Param('id') id: string,
        @Body() dto: RatingsUpdateDto
    ): RatingsResponseDto {
        return this.service.update(id, dto);
    }

    @Delete(':id')
    @ApiOperation({
        summary: 'Supprimer une appréciation',
        description: 'Supprime une appréciation spécifique à partir de son identifiant unique.'
    })
    @ApiParam({
        name: 'id',
        description: "Identifiant unique de l'appréciation à supprimer"
    })
    @ApiResponse({
        status: 200,
        description: 'Appréciation supprimée avec succès.',
        type: RatingsResponseDto
    })
    @ApiResponse({
        status: 404,
        description: 'Appréciation introuvable.'
    })
    remove(@Param('id') id: string): RatingsResponseDto {
        return this.service.remove(id);
    }
}