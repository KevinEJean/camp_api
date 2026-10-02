import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { HealthModule } from './health/health.module.js';
import { LocationsModule } from './locations/locations.module.js';
import { RatingsModule } from './ratings/ratings.module.js';

@Module({
  imports: [
    HealthModule,
    LocationsModule,
    RatingsModule,
    MongooseModule.forRoot(`mongodb+srv://kevinjean438_db_user:KIQT0Zr6I67vLEU0@cluster-dev.xtn05en.mongodb.net/?appName=Cluster-dev`), // to change process.env.MONGODB_URI
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
