import { NestFactory } from '@nestjs/core';
import { VersioningType } from '@nestjs/common';
import { configureSwagger } from './configure-swagger.js';
import { AppModule } from './app.module.js';
import { HttpExceptionFilter } from './exception/filters/http-exception.filter.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  configureSwagger(app);
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
