import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { RatingsCreateDto } from './dto/create-ratings.dto.js';
import { RatingsUpdateDto } from './dto/update-ratings.dto.js';
import { RatingsResponseDto } from './dto/response-ratings.dto.js';
import { Ratings } from './entities/ratings.entity.js';
import DatabaseGenerator from '../config/db.config.js';
import * as fs from 'fs';
import { LocationsService } from '../locations/locations.service.js';

@Injectable()
export class RatingsService {

    private readonly path = new DatabaseGenerator().pathRatings;
    private readonly serviceLocations = new LocationsService();

    constructor() {
        if (!fs.existsSync(this.path)) {
            new DatabaseGenerator().setup();
        }
    }

    findAll(): Ratings[] {
        try {
            const rawData = fs.readFileSync(this.path, 'utf8');
            const parsed = JSON.parse(rawData);

            return Array.isArray(parsed?.ratings) ? parsed?.ratings : [];
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    findOne(id: string): RatingsResponseDto {
        try {
            const repo = this.findAll();
            const rating = repo.find((item) => item._id === id);

            if (!rating) {
                throw new NotFoundException(`Rating with ID "${id}" not found.`);
            }

            const createdAtDate = rating.createdAt ? new Date(rating.createdAt) : new Date();
            const updatedAtDate = rating.updatedAt ? new Date(rating.updatedAt) : new Date();

            return {
                code: 200,
                placeId: rating.placeId,
                authorName: rating.authorName,
                rating: rating.rating,
                comment: rating.comment,
                createdAt: createdAtDate.toISOString(),
                updatedAt: updatedAtDate.toISOString()
            };
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException('Failed to find rating.');
        }
    }

    create(dto: RatingsCreateDto): RatingsResponseDto {
        const repo = this.findAll();
        const repoLocations = this.serviceLocations.findAll();

        const location = repoLocations.find((item) => item._id === dto.placeId);

        if (!location) {
            throw new NotFoundException(`No location with "${dto.placeId}" exists.`);
        }

        const newRating = new Ratings(
            dto.placeId,
            dto.authorName,
            dto.rating,
            dto.comment
        );

        try {
            repo.push(newRating);
            fs.writeFileSync(this.path, JSON.stringify({ ratings: repo }, null, 2), 'utf8');

            const ratings = repo.filter((item) => item.placeId === location._id);
            const sum = ratings.reduce((sum, item) => sum + Number(item.rating), 0);

            location.reviewCount = ratings.length;
            location.averageRating = Number((sum / ratings.length).toFixed(2));

            fs.writeFileSync(this.serviceLocations.path, JSON.stringify({ locations: repoLocations }, null, 2), 'utf8');

            return {
                code: 201,
                createdAt: new Date().toISOString()
            };
        } catch (error) {
            throw new InternalServerErrorException('Failed to create rating.');
        }
    }

    update(id: string, dto: RatingsUpdateDto): RatingsResponseDto {
        const repo = this.findAll();
        const targetIndex = repo.findIndex((item) => String(item._id) === id);

        if (targetIndex === -1) {
            throw new NotFoundException(`Rating with ID "${id}" not found.`);
        }

        const updatedRating: Ratings = {
            ...repo[targetIndex],
            ...Object.fromEntries(
                Object.entries(dto).filter(([_, value]) => value !== undefined)
            ),
            updatedAt: new Date()
        };

        const updatedRepo = [...repo];
        updatedRepo[targetIndex] = updatedRating;

        try {
            fs.writeFileSync(this.path, JSON.stringify({ ratings: updatedRepo }, null, 2), 'utf8');
        } catch (error) {
            throw new InternalServerErrorException('Failed to update rating.');
        }

        return {
            code: 200,
            placeId: updatedRating.placeId,
            authorName: updatedRating.authorName,
            rating: updatedRating.rating,
            comment: updatedRating.comment,
            updatedAt: updatedRating.updatedAt.toISOString()
        };
    }

    remove(id: string): RatingsResponseDto {
        this.findOne(id);

        const repo = this.findAll();
        const newRepo = repo.filter((item) => String(item._id) !== id);

        try {
            fs.writeFileSync(this.path, JSON.stringify({ ratings: newRepo }, null, 2), 'utf8');
        } catch (error) {
            throw new InternalServerErrorException('Failed to remove rating.');
        }

        return { code: 204 };
    }
}