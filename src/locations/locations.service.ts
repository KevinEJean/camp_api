import { Injectable } from '@nestjs/common';
import { LocationsCreateDto } from './dto/create-locations.dto.js';
import { LocationsUpdateDto } from './dto/update-locations.dto.js';
import { LocationsResponseDto } from './dto/response-locations.dto.js';
import { Locations } from './entities/locations.entity.js';
import { Category } from './enums/category.enum.js';
import { Status } from './enums/status.enum.js';
import DatabaseGenerator from '../config/db.config.js';
import * as fs from 'fs';

@Injectable()
export class LocationsService {

    private readonly path = new DatabaseGenerator().path;

    constructor() {
        if (!fs.existsSync(this.path)) {
            new DatabaseGenerator().setup();
        }
    }

    findAll(): LocationsCreateDto[] {
        try {

            const rawData = fs.readFileSync(this.path, 'utf8');

            return JSON.parse(rawData) as LocationsCreateDto[];

        } catch (error) {
            throw new Error('Failed to find all locations'); // throw error 500
        }
    }

    findOne(id: string): LocationsResponseDto {
        try {
            const rawData = fs.readFileSync(this.path, 'utf8');
            const repo = JSON.parse(rawData) as Locations[];
            let result = new Locations('test', 'test', Category.OTHER, 'test');

            for (let i = 0; i < repo.length; i++) {
                if (repo[i]._id == id) {
                    result = repo[i];
                }
            }

            // if (result.name == 'test') {
            // throw error 404 (Not Found)
            // }

            const response: LocationsResponseDto = {
                code: 200,
                name: result.name,
                description: result.description,
                category: result.category,
                address: result.address,
                services: result.services ?? [],
                status: result.status ?? Status.ACTIVE,
                createdAt: result.createdAt.toISOString(),
                updatedAt: result.updateAt.toISOString()
            }

            return response

        } catch (error) {
            throw new Error('Failed to find location'); // throw error 500
        }
    }

    create(dto: LocationsCreateDto): LocationsResponseDto {
        try {
            const repo = this.findAll();

            for (let i = 0; i < repo.length; i++) {
                if (repo[i].name == dto.name) {
                    throw new Error(); // throw error 400 (duplicate)
                }
            }

            repo.push(dto);
            fs.writeFileSync(this.path, JSON.stringify(repo, null, 2), 'utf8');

            const response: LocationsResponseDto = {
                code: 201,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            }

            return response;

        } catch (error) {
            throw new Error('Failed to create location'); // throw error 500
        }
    }

    update(dto: LocationsUpdateDto): LocationsResponseDto[] {
        return [];
    }

    remove(id: string) {
        return [];
    }
}
