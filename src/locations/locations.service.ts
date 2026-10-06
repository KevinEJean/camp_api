import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import DatabaseGenerator from '../config/db.config.js';
import { LocationsUpdateDto } from './dto/update-locations.dto.js';
import { LocationsResponseDto } from './dto/response-locations.dto.js';
import { Locations } from './entities/locations.entity.js';
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
        return this.locationModel.find().exec();
    }

    async findOne(id: string): Promise<Location> {
        const location = await this.locationModel.aggregate([
            { $match: { _id: id } }
        ]);

        if (location.length < 0) {
            throw new NotFoundException(`Location with ID "${id}" not found.`);
        }

        return location[0];
    }

    async create(location: Partial<Location>): Promise<Location> {
        if (!location.name || !location.description || !location.category || !location.address) {
            throw new BadRequestException("Rquest is missing at least one of these values : name / description / category / address)");
        }

        const newLocation = new Locations(
            location.name,
            location.description,
            location.category,
            location.address,
            location.services,
            location.status,
        );

        const createdLocation = new this.locationModel(newLocation);
        return await createdLocation.save();
    }

    async update(id: string, dto: Partial<LocationsUpdateDto>): Promise<Location> {
        const location = this.findOne(id);

        const name = dto?.name || (await location).name;
        const description = dto?.description || (await location).description;
        const category = dto?.category || (await location).category;
        const address = dto?.address || (await location).address;
        const services = dto?.services || (await location).services;
        const status = dto?.status || (await location).status;

        await this.locationModel.updateOne(
            { id: id },
            [
                { $set: { name: name } },
                { $set: { description: description } },
                { $set: { category: category } },
                { $set: { address: address } },
                { $set: { services: services } },
                { $set: { status: status } }
            ],
            { updatePipeline: true }
        )

        return await this.findOne(id);
    }

    async remove(id: string): Promise<LocationsResponseDto> {
        await this.locationModel.deleteOne([
            {$match: { _id: id } }
        ]);

        return { code: 204 }
    }
}
