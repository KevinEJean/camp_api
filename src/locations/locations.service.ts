import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import DatabaseGenerator from '../config/db.config.js';
import { LocationsUpdateDto } from './dto/update-locations.dto.js';
import { LocationsResponseDto } from './dto/response-locations.dto.js';
import { LocationsRepository } from './locations.repository.js';
import { Locations } from './entities/locations.entity.js';
import { Location } from './schemas/locations.schema.js';
import * as fs from 'fs';

@Injectable()
export class LocationsService {

    public readonly path = new DatabaseGenerator().pathLocations;

    constructor(@InjectModel(Location.name) private readonly locationModel: Model<Location>, private readonly repository: LocationsRepository) {
        if (!fs.existsSync(this.path)) {
            new DatabaseGenerator().setup();
        }
    }

    async findAll(): Promise<Location[]> {
        return this.repository.findAll();
    }

    async findOne(id: string): Promise<Location> {
        const location = await this.repository.findById(id);

        if (!location) {
            throw new NotFoundException(`Location with ID ("${id}") not found.`);
        }

        return location;
    }

    async create(location: Partial<Location>): Promise<Location> {
        if (!location?.name || !location?.description || !location?.category || !location?.address) {
            throw new BadRequestException("Request is missing at least one of these values : name / description / category / address)");
        }

        const newLocation = new Locations(
            location.name,
            location.description,
            location.category,
            location.address,
            location.services,
            location.status,
        );

        const createdLocation: Partial<Location> = {
            _id: newLocation._id,
            name: newLocation.name,
            description: newLocation.description,
            category: newLocation.category,
            address: newLocation.address,
            services: newLocation.services,
            status: newLocation.status,
        };

        return await this.repository.create(createdLocation);
    }

    async update(id: string, dto: Partial<LocationsUpdateDto>) {

        if (!dto?.name && !dto?.description && !dto?.category && !dto?.address && !dto?.services && !dto?.status) {
            throw new BadRequestException("Empty requests are not allowed for type PATCH");
        }


        return this.locationModel.findByIdAndUpdate({ _id: id }, dto, { new: true }).exec();
    }

    async remove(id: string): Promise<LocationsResponseDto> {
        await this.findOne(id);
        await this.repository.deleteById(id);
        return { code: 204 }
    }
}
