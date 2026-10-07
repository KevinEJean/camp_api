import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LocationsController } from './locations.controller.js';
import { LocationsRepository } from './locations.repository.js';
import { LocationsService } from './locations.service.js';
import { Location, LocationSchema } from './schemas/locations.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Location.name, schema: LocationSchema }]),
  ],
  controllers: [LocationsController],
  providers: [
    LocationsService,
    LocationsRepository,
  ],
  exports: [LocationsService]
})
export class LocationsModule {}
