import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiConflictResponse,
    ApiCreatedResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiParam,
    ApiTags,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UsersService } from './users.service.js';
import { UsersCreateDto } from './dto/create-users.dto.js';
import { UsersResponseDto } from './dto/response-users.dto.js';
import { User } from './schemas/users.schema.js';
import { PermissionsGuard, RequirePermission } from '../auth/guard/permission.guard.js';

@ApiTags('Utilisateurs')
@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Jeton JWT manquant, invalide ou expiré.' })
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @UseGuards(PermissionsGuard)
    @RequirePermission('read', 'users')
    @Get()
    @ApiOperation({
        summary: 'Lister tous les utilisateurs',
        description: "Retourne la liste de tous les utilisateurs enregistrés. Le mot de passe n'est jamais retourné.",
    })
    @ApiOkResponse({
        description: 'Liste des utilisateurs.',
        type: UsersResponseDto,
        isArray: true,
    })
    findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @UseGuards(PermissionsGuard)
    @RequirePermission('read', 'users')
    @Get(':id')
    @ApiOperation({
        summary: 'Obtenir un utilisateur',
        description: "Retourne l'utilisateur correspondant à l'identifiant fourni. Le mot de passe n'est jamais retourné.",
    })
    @ApiParam({
        name: 'id',
        description: "Identifiant unique de l'utilisateur.",
        example: 'usr_01ABCD12',
    })
    @ApiOkResponse({
        description: "L'utilisateur correspondant à l'identifiant.",
        type: UsersResponseDto,
    })
    @ApiNotFoundResponse({ description: "Aucun utilisateur ne correspond à cet identifiant." })
    findOne(@Param('id') id: string): Promise<User> {
        return this.usersService.findOne(id);
    }

    @UseGuards(PermissionsGuard)
    @RequirePermission('create', 'users')
    @Post()
    @ApiOperation({
        summary: 'Créer un utilisateur',
        description: "Crée un nouvel utilisateur à partir d'un nom et d'un mot de passe. Le mot de passe est haché avant d'être enregistré.",
    })
    @ApiCreatedResponse({
        description: "L'utilisateur a été créé. Le mot de passe n'est pas retourné.",
        type: UsersResponseDto,
    })
    @ApiBadRequestResponse({
        description: 'Données invalides : nom ou mot de passe manquant, ou mot de passe trop court (8 caractères minimum).',
    })
    @ApiConflictResponse({ description: 'Un utilisateur portant ce nom existe déjà.' })
    create(@Body() dto: UsersCreateDto): Promise<UsersResponseDto> {
        return this.usersService.create(dto);
    }

    @UseGuards(PermissionsGuard)
    @RequirePermission('delete', 'users')
    @Delete(':id')
    @ApiOperation({
        summary: 'Supprimer un utilisateur',
        description: "Supprime définitivement l'utilisateur correspondant à l'identifiant fourni.",
    })
    @ApiParam({
        name: 'id',
        description: "Identifiant unique de l'utilisateur à supprimer.",
        example: 'usr_01ABCD12',
    })
    @ApiOkResponse({
        description: "L'utilisateur a été supprimé. Le corps de la réponse contient `code: 204`.",
        type: UsersResponseDto,
    })
    @ApiNotFoundResponse({ description: "Aucun utilisateur ne correspond à cet identifiant." })
    remove(@Param('id') id: string): Promise<UsersResponseDto> {
        return this.usersService.remove(id);
    }
}