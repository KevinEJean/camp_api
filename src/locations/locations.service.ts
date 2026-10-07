import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LocationsCreateDto } from './dto/create-locations.dto.js';
import { LocationsUpdateDto } from './dto/update-locations.dto.js';
import { LocationsResponseDto } from './dto/response-locations.dto.js';
import { Locations } from './entities/locations.entity.js';
import { LocationsRepository } from './locations.repository.js';
import { Location } from './schemas/locations.schema.js';

@Injectable()
export class LocationsService {

    constructor(
        @InjectModel(Location.name) public readonly locationModel: Model<Location>,
        private readonly repository: LocationsRepository) { }

    async findAll(): Promise<Location[]> {
        return this.repository.findAll();
    }

    async findOne(id: string): Promise<Location> {
        const location = await this.repository.findById(id);

        if (!location) {
            throw new NotFoundException(`Location with ID ("${id}") not found`);
        }

        return location;
    }

    async create(dto: Partial<LocationsCreateDto>): Promise<Location> {
        if (!dto?.name || !dto?.description || !dto?.category || !dto?.address) {
            throw new BadRequestException("Request is missing at least one of these values : name / description / category / address)");
        }

        const newLocation = new Locations( // pour ajouter l'id
            dto.name,
            dto.description,
            dto.category,
            dto.address,
            dto.services,
            dto.status,
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

    async updateRatings(id: string, increment: number, average: number) {
        console.log(id, increment, average)
        await this.locationModel.findByIdAndUpdate(
            id,
            {
                $inc: { reviewCount: increment },
                $set: { averageRating: average }
            },
            { new: true }
        ).exec();
    }

    async remove(id: string): Promise<LocationsResponseDto> {
        const location = await this.findOne(id);

        if (location.reviewCount !== 0) {
            throw new ConflictException("Cannot delete this location because it reviews linked to it still exist");
        }

        await this.repository.deleteById(id);
        return { code: 204 }
    }
}
