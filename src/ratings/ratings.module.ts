import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RatingsController } from './ratings.controller.js';
import { RatingsRepository } from './ratings.repository.js';
import { RatingsService } from './ratings.service.js';
import { Rating, RatingSchema } from './schemas/ratings.schema.js';
import { LocationsModule } from '../locations/locations.module.js';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Rating.name, schema: RatingSchema }]),
    forwardRef(() => LocationsModule),
  ],
  controllers: [RatingsController],
  providers: [
    RatingsService,
    RatingsRepository,
  ]
})
export class RatingsModule {}
