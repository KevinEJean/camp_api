import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { configureSwagger } from './configure-swagger.js';
import { AppModule } from './app.module.js';
import { HttpExceptionFilter } from './exception/filters/http-exception.filter.js';
import { ExecutionTimeInterceptor } from './exception/interceptors/execution-time.interceptor.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalInterceptors(
    new ExecutionTimeInterceptor()
  );
  app.useGlobalFilters(
    new HttpExceptionFilter()
  );

  const port = Number(process.env.PORT);
  if (
    !Number.isInteger(port) ||
    port <= 0 ||
    port > 65535
  ) {
    throw new Error(
      `La variable PORT doit contenir un port valide. Invalide => (${process.env.PORT})`,
    );
  }

  configureSwagger(app);

  await app.listen(port);
}
bootstrap();
