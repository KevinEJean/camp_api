import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Rating } from './schemas/ratings.schema.js';
import { RatingsCreateDto } from './dto/create-ratings.dto.js';

@Injectable()
export class RatingsRepository {
    constructor(@InjectModel(Rating.name) private readonly ratingModel: Model<Rating>) { }

    async findAll(): Promise<Rating[]> {
        return this.ratingModel.find().exec();
    }

    async findById(id: string): Promise<Rating | null> {
        return this.ratingModel.findById(id).exec();
    }

    async create(createdRating: Partial<RatingsCreateDto>): Promise<Rating> {
        return this.ratingModel.create(createdRating);
    }

    async deleteById(id: string): Promise<void> {
        await this.ratingModel.findByIdAndDelete(id).exec();
    }
}