import { Module } from '@nestjs/common';
import { LocationsController } from './locations.controller.js';
import { LocationsService } from './locations.service.js';
import { MongooseModule } from '@nestjs/mongoose';
import { LocationSchema } from './schemas/locations.schema.js';
import { Location } from './schemas/locations.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Location.name, schema: LocationSchema }]),
  ],
  controllers: [LocationsController],
  providers: [LocationsService]
})
export class LocationsModule {}
