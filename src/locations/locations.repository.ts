import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Location } from './schemas/locations.schema.js';
import { LocationsCreateDto } from './dto/create-locations.dto.js';

@Injectable()
export class LocationsRepository {
    constructor(@InjectModel(Location.name) private readonly locationModel: Model<Location>) { }

    async findAll(): Promise<Location[]> {
        return this.locationModel.find().exec();
    }

    async findById(id: string): Promise<Location | null> {
        return this.locationModel.findById(id).exec();
    }

    async create(createdLocation: Partial<LocationsCreateDto>): Promise<Location> {
        return this.locationModel.create(createdLocation);
    }

    async deleteById(id: string): Promise<void> {
        await this.locationModel.findByIdAndDelete(id).exec();
    }
}