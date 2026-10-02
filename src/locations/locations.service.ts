import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import DatabaseGenerator from '../config/db.config.js';
import { LocationsUpdateDto } from './dto/update-locations.dto.js';
import { LocationsResponseDto } from './dto/response-locations.dto.js';
import { Location } from './schemas/locations.schema.js';
import * as fs from 'fs';

@Injectable()
export class LocationsService {

    public readonly path = new DatabaseGenerator().pathLocations;

    constructor(@InjectModel(Location.name) private readonly locationModel: Model<Location>) {
        if (!fs.existsSync(this.path)) {
            new DatabaseGenerator().setup();
        }
    }

    async findAll(): Promise<Location[]> {
        try {
            return this.locationModel.find().exec();
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async findOne(id: string): Promise<Location> {
        try {
            const location = await this.locationModel.findById(id).exec();

            if (!location) {
                throw new NotFoundException(`Location with ID "${id}" not found.`);
            }

            return location;
        } catch (error) {
            throw error;
        }
    }

    async create(location: Partial<Location>): Promise<Location> {
        try {
            return this.locationModel.create(location);
        } catch (error) {
            throw error;
        }
    }

    async update(id: string, dto: LocationsUpdateDto): Promise<Location> {
        try {
            const location = await this.locationModel.findByIdAndUpdate({"_id": id}, Array.of(dto));

            if (!location) {
                throw new NotFoundException(`Location with ID "${id}" not found.`);
            }

            const newLocation = await this.locationModel.findById(id).exec();

            if (!newLocation) {
                throw new InternalServerErrorException('Error while attempting to find the location.');
            }

            return newLocation;
        } catch (error) {
            throw error;
        }
    }

    remove(id: string): LocationsResponseDto {
        try {
            this.locationModel.findOneAndDelete({"_id": id});

            return { code: 204 }
        } catch (error) {
            throw error;
        }
    }
}
