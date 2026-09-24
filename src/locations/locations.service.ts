import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { LocationsCreateDto } from './dto/create-locations.dto.js';
import { LocationsUpdateDto } from './dto/update-locations.dto.js';
import { LocationsResponseDto } from './dto/response-locations.dto.js';
import { Locations } from './entities/locations.entity.js';
import { Status } from './enums/status.enum.js';
import DatabaseGenerator from '../config/db.config.js';
import * as fs from 'fs';

@Injectable()
export class LocationsService {

    public readonly path = new DatabaseGenerator().pathLocations;

    constructor() {
        if (!fs.existsSync(this.path)) {
            new DatabaseGenerator().setup();
        }
    }

    findAll(): Locations[] {
        try {
            const rawData = fs.readFileSync(this.path, 'utf8');
            const parsed = JSON.parse(rawData);

            return Array.isArray(parsed.locations) ? parsed.locations : [];
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    findOne(id: string): LocationsResponseDto {
        try {
            const repo = this.findAll();
            const location = repo.find((item) => item._id === id);

            if (!location) {
                throw new NotFoundException(`Location with ID "${id}" not found.`);
            }

            const createdAtDate = location.createdAt ? new Date(location.createdAt) : new Date();
            const updatedAtDate = location.updatedAt ? new Date(location.updatedAt) : new Date();

            return {
                code: 200,
                name: location.name,
                description: location.description,
                category: location.category,
                address: location.address,
                services: location.services ?? [],
                status: location.status ?? Status.ACTIVE,
                createdAt: createdAtDate.toISOString(),
                updatedAt: updatedAtDate.toISOString()
            }
        } catch (error) {
            throw error;
        }
    }

    create(dto: LocationsCreateDto): LocationsResponseDto {
        const repo = this.findAll();
        const isDuplicate = repo.some((item) => item.name == dto.name);

        if (isDuplicate) {
            throw new BadRequestException(`Duplicates not allowed: Location with name "${dto.name}" already exists.`);
        }

        const newLocations = new Locations(
            dto.name,
            dto.description,
            dto.category,
            dto.address,
            dto.services ?? [],
            dto.status ?? Status.ACTIVE
        );

        try {
            repo.push(newLocations);
            fs.writeFileSync(this.path, JSON.stringify({ locations: repo }, null, 2), 'utf8');
        } catch (error) {
            throw error;
        }
        return {
            code: 201,
            createdAt: new Date().toISOString()
        };
    }

    update(id: string, dto: LocationsUpdateDto): LocationsResponseDto {
        const repo = this.findAll();
        const targetIndex = repo.findIndex((item) => String(item._id) === id);

        if (targetIndex === -1) {
            throw new NotFoundException(`Location with ID "${id}" not found.`);
        }

        /* 
        
        Integartion IA
        
        Remplacer :
        oldLocation.name == dto.name,
        oldLocation.description == dto.description,
        oldLocation.category == dto.category,
        oldLocation.address == dto.address
        ...

        Avec :*/
        const updatedLocation: Locations = {
            ...repo[targetIndex],
            ...Object.fromEntries(
                Object.entries(dto).filter(([_, value]) => value !== undefined)
            ),
            updatedAt: new Date()
        }

        const updatedRepo = [...repo];
        updatedRepo[targetIndex] = updatedLocation;

        try {
            fs.writeFileSync(this.path, JSON.stringify({ locations: updatedRepo }, null, 2), 'utf8');
        } catch (error) {
            throw error;
        }

        return {
            code: 200,
            name: updatedLocation.name,
            description: updatedLocation.description,
            category: updatedLocation.category,
            address: updatedLocation.address,
            services: updatedLocation.services ?? [],
            status: updatedLocation.status ?? Status.ACTIVE,
            updatedAt: updatedLocation.updatedAt.toISOString()
        };
    }

    remove(id: string): LocationsResponseDto {
        this.findOne(id);

        const repo = this.findAll();
        const tempRepo = repo;
        const test = tempRepo.filter((item) => String(item._id) === id);

        if (test[0].reviewCount > 0) {
            throw new BadRequestException('Not allowed to delete a location with active ratings!');
        }

        const newRepo = repo.filter((item) => String(item._id) !== id);

        try {
            fs.writeFileSync(this.path, JSON.stringify({ locations: newRepo }, null, 2), 'utf8');
        } catch (error) {
            throw error;
        }

        return { code: 204 };
    }
}
