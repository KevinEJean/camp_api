import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiResponse, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';
import { LocationsResponseDto } from './dto/response-locations.dto.js';
import { LocationsCreateDto } from './dto/create-locations.dto.js';
import { LocationsService } from './locations.service.js';
import { LocationsUpdateDto } from './dto/update-locations.dto.js';
import { Locations } from './entities/locations.entity.js';

@Controller('locations')
export class LocationsController {

    private readonly service = new LocationsService();

    @Get()
    @ApiOperation({
        summary: 'Récupérer toutes les emplacements', 
        description: "Récupère la liste de tous les enregistrements d'emplacements existants."
    })
    @ApiResponse({
        status: 200, 
        description: 'Liste des emplacements récupérée avec succès.', 
        type: [LocationsResponseDto]
    })
    findAll(): Locations[] {
        return this.service.findAll();
    }

    @Get(':id')
    @ApiOperation({
        summary: 'Récupérer un emplacement par son ID', 
        description: "Récupère les détails d'un seul emplacement grâce à son identifiant unique."
    })
    @ApiParam({
        name: 'id', 
        description: "Identifiant unique de l'emplacement", 
        example: '123e4567-e89b-12d3-a456-426614174000'
    })
    @ApiResponse({
        status: 200, 
        description: 'Emplacement trouvé avec succès.', 
        type: LocationsResponseDto
    })
    @ApiResponse({
        status: 404, 
        description: 'Emplacement non trouvé.'
    })
    findOne(@Param('id') id: string): LocationsResponseDto {
        return this.service.findOne(id);
    }

    @Post()
    @ApiOperation({
        summary: 'Créer un nouvel emplacement', 
        description: "Crée un nouvel enregistrement d'emplacement avec les données fournies."
    })
    @ApiBody({
        type: LocationsCreateDto
    })
    @ApiResponse({
        status: 201, 
        description: 'Emplacement créé avec succès.', 
        type: LocationsResponseDto
    })
    @ApiResponse({
        status: 400, 
        description: 'Requête invalide / Erreur de validation.'
    })
    create(@Body() dto: LocationsCreateDto): LocationsResponseDto {
        return this.service.create(dto);
    }

    @Patch(':id')
    @ApiOperation({
        summary: 'Mettre à jour un emplacement existant', 
        description: "Met à jour partiellement certains champs d'un emplacement existant."
    })
    @ApiParam({
        name: 'id', 
        description: "Identifiant unique de l'emplacement à mettre à jour"
    })
    @ApiBody({
        type: LocationsUpdateDto
    })
    @ApiResponse({
        status: 200, 
        description: 'Emplacement mis à jour avec succès.', 
        type: LocationsResponseDto
    })
    @ApiResponse({
        status: 400, 
        description: 'Requête invalide / Données fournies incorrectes.'
    })
    @ApiResponse({
        status: 404, 
        description: 'Emplacement non trouvé.'
    })
    update(@Param('id') id: string, @Body() dto: LocationsUpdateDto): LocationsResponseDto {
        return this.service.update(id, dto);
    }

    @Delete(':id')
    @ApiOperation({
        summary: 'Supprimer un emplacement', 
        description: "Supprime un enregistrement d'emplacement spécifique grâce à son identifiant unique."
    })
    @ApiParam({
        name: 'id', 
        description: "Identifiant unique de l'emplacement à supprimer"
    })
    @ApiResponse({
        status: 200, 
        description: 'Emplacement supprimé avec succès.', 
        type: LocationsResponseDto
    })
    @ApiResponse({
        status: 404, 
        description: 'Emplacement non trouvé.'
    })
    remove(@Param('id') id: string): LocationsResponseDto {
        return this.service.remove(id);
    }
}