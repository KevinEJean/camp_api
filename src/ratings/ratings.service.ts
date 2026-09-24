import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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
            throw error;
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

        repo.push(newRating);

        try {
            fs.writeFileSync(this.path, JSON.stringify({ ratings: repo }, null, 2), 'utf8');

            const ratings = repo.filter((item) => item.placeId === location._id);
            const sum = ratings.reduce((sum, item) => sum + Number(item.rating), 0);

            location.reviewCount = ratings.length;
            location.averageRating = Number((sum / ratings.length).toFixed(2));

            fs.writeFileSync(this.serviceLocations.path, JSON.stringify({ locations: repoLocations }, null, 2), 'utf8');
        } catch (error) {
            throw error;
        }

        return {
            code: 201,
            createdAt: new Date().toISOString()
        };
    }

    update(id: string, dto: RatingsUpdateDto): RatingsResponseDto {
        const repo = this.findAll();
        const targetIndex = repo.findIndex((item) => String(item._id) === id);

        if (targetIndex === -1) {
            throw new NotFoundException(`Rating with ID "${id}" not found.`);
        }

        /* 
        
        Integartion IA
        
        Remplacer :
        oldRating.rating == dto.rating,
        oldRating.comment == dto.comment

        Avec :*/
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
            throw error;
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
        const repoLocations = this.serviceLocations.findAll();
        const location = repoLocations.find((item) => String(item._id) === this.findOne(id).placeId);

        if (location == null || undefined) {
            throw new NotFoundException(`No location with "${id}" exists.`);
        }

        if (location.reviewCount > 0) {
            location.reviewCount -= 1;
            if (location.reviewCount == 0) {
                location.averageRating = null;
            }
        }

        const newRepo = repo.filter((item) => String(item._id) !== id);


        try {
            fs.writeFileSync(this.path, JSON.stringify({ ratings: newRepo }, null, 2), 'utf8');
            fs.writeFileSync(this.serviceLocations.path, JSON.stringify({ locations: repoLocations }, null, 2), 'utf8');
        } catch (error) {
            throw error;
        }

        return { code: 204 };
    }
}