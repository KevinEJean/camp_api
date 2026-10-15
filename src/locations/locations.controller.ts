import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiOperation, ApiParam, ApiBody, ApiBearerAuth, ApiUnauthorizedResponse, ApiTags } from '@nestjs/swagger';
import { LocationsResponseDto } from './dto/response-locations.dto.js';
import { LocationsCreateDto } from './dto/create-locations.dto.js';
import { LocationsService } from './locations.service.js';
import { LocationsUpdateDto } from './dto/update-locations.dto.js';
import { Location } from './schemas/locations.schema.js';
import { PermissionsGuard, RequirePermission } from '../auth/guard/permission.guard.js';

@ApiTags('Emplacements')
@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Jeton JWT manquant, invalide ou expiré.' })
@Controller('locations')
export class LocationsController {

    constructor (private readonly service: LocationsService) {}

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
    findAll(): Promise<Location[]> {
        return this.service.findAll();
    }

    @UseGuards(PermissionsGuard)
    @RequirePermission('read', 'locations')
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
    findOne(@Param('id') id: string): Promise<Location> {
        return this.service.findOne(id);
    }

    @UseGuards(PermissionsGuard)
    @RequirePermission('create', 'locations')
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
    create(@Body() dto: LocationsCreateDto): Promise<Location> {
        return this.service.create(dto);
    }

    @UseGuards(PermissionsGuard)
    @RequirePermission('update', 'locations')
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
    update(@Param('id') id: string, @Body() dto: LocationsUpdateDto) {
        return this.service.update(id, dto);
    }

    @UseGuards(PermissionsGuard)
    @RequirePermission('delete', 'locations')
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
    remove(@Param('id') id: string): Promise<LocationsResponseDto> {
        return this.service.remove(id);
    }
}