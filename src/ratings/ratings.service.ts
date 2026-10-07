import {
    BadRequestException,
    forwardRef,
    Inject,
    Injectable,
    InternalServerErrorException,
    NotFoundException
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RatingsCreateDto } from './dto/create-ratings.dto.js';
import { RatingsUpdateDto } from './dto/update-ratings.dto.js';
import { RatingsResponseDto } from './dto/response-ratings.dto.js';
import { Ratings } from './entities/ratings.entity.js';
import { LocationsService } from '../locations/locations.service.js';
import { RatingsRepository } from './ratings.repository.js';
import { Rating } from './schemas/ratings.schema.js';

@Injectable()
export class RatingsService {

    constructor(
        @InjectModel(Rating.name) private readonly ratingModel: Model<Rating>,
        private readonly repository: RatingsRepository,
        @Inject(forwardRef(() => LocationsService))
        private readonly locationsService: LocationsService) { }

    async findAll(): Promise<Rating[]> {
        return await this.repository.findAll();
    }

    async findOne(id: string): Promise<Rating> {
        const rating = await this.repository.findById(id);

        if (!rating) {
            throw new NotFoundException(`Rating with ID ("${id}") not found`);
        }

        return rating;
    }

    async create(dto: Partial<RatingsCreateDto>): Promise<Rating> {
        if (!dto?.placeId || !dto?.authorName || !dto?.rating || !dto?.comment) {
            throw new BadRequestException("Request is missing at least one of these values : placeId / authorName / rating / comment)");
        }

        const location = await this.locationsService.findOne(dto.placeId);

        const newRating = new Ratings( // pour ajouter l'id
            dto.placeId,
            dto.authorName,
            dto.rating,
            dto.comment
        );

        const createdRating: Partial<Rating> = {
            _id: newRating._id,
            placeId: newRating.placeId,
            authorName: newRating.authorName,
            rating: newRating.rating,
            comment: newRating.comment,
        };

        await this.repository.create(createdRating); // sync this with this.locationsService.updateRatings

        const locationRatings = await this.ratingModel.find({ placeId: dto.placeId });
        const ratingSum = locationRatings.reduce((ratingValue, review) => ratingValue + Number(review.rating), 0);
        const reviewAverage = Number((ratingSum / locationRatings.length).toFixed(2));

        await this.locationsService.updateRatings(location._id, 1, reviewAverage);

        return newRating;
    }

    async update(id: string, dto: RatingsUpdateDto) {
        if (!dto?.rating && !dto?.comment) {
            throw new BadRequestException("Empty requests are not allowed for type PATCH");
        }

        await this.ratingModel.findByIdAndUpdate({ _id: id }, dto, { new: true })

        if (dto.rating != undefined) {
            const rating = await this.findOne(id);
            const locationRatings = await this.ratingModel.find({ placeId: rating.placeId });
            const ratingSum = locationRatings.reduce((ratingValue, review) => ratingValue + Number(review.rating), 0);
            const reviewAverage = locationRatings.length > 0 ?
                Number((ratingSum / locationRatings.length).toFixed(2)) : 0;

            await this.locationsService.updateRatings(rating.placeId, 0, reviewAverage);
        }

        return await this.ratingModel.findByIdAndUpdate({ _id: id }, dto, { new: true });
    }

    async remove(id: string): Promise<RatingsResponseDto> {
        const rating = await this.findOne(id);

        await this.repository.deleteById(id);

        const location = await this.locationsService.findOne(rating.placeId);
        if (location.reviewCount < 1) {
            throw new InternalServerErrorException("Database is not synchronised with local changes, please report this issue to technical support");
        }

        const locationRatings = await this.ratingModel.find({ placeId: rating.placeId });
        const ratingSum = locationRatings.reduce((ratingValue, review) => ratingValue + Number(review.rating), 0);
        const reviewAverage = locationRatings.length > 0 ?
            Number((ratingSum / locationRatings.length).toFixed(2)) : 0;

        await this.locationsService.updateRatings(location._id, -1, reviewAverage);

        return { code: 204 };
    }
}