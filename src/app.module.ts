import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import databaseConfig from './configs/database.config.js';
import { HealthModule } from './health/health.module.js';
import { LocationsModule } from './locations/locations.module.js';
import { RatingsModule } from './ratings/ratings.module.js';
import { RequestLoggerMiddleware } from './exceptions/middleware/request-logger.middleware.js';
import { AuthModule } from './auth/auth.module.js';
import { JwtAuthGuard } from './auth/guard/jwt-auth.guard.js';
import { PermissionsGuard } from './auth/guard/permission.guard.js';
import { PermitModule } from './users/permit.module.js';
import Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development',
      load: [databaseConfig],
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().required(),
        MONGO_URI: Joi.string().required(),
        PERMIT_IO_TOKEN: Joi.string().required(),
        PORT: Joi.number().default(3000),
      }),
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.getOrThrow<string>('MONGO_URI'),
        autoIndex: process.env.NODE_ENV !== 'production',
      }),
    }),

    AuthModule,
    PermitModule,
    HealthModule,
    LocationsModule,
    RatingsModule,
  ],
  providers: [
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: PermissionsGuard },
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RequestLoggerMiddleware)
      .forRoutes('*');
  }
}
