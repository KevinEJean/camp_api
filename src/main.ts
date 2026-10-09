import { NestFactory } from '@nestjs/core';
import { VersioningType, InternalServerErrorException, ValidationPipe } from '@nestjs/common';
import { configureSwagger } from './config/configure-swagger.js';
import { AppModule } from './app.module.js';
import { HttpExceptionFilter } from './exception/filters/http-exception.filter.js';
import { ExecutionTimeInterceptor } from './exception/interceptors/execution-time.interceptor.js';
import { configureWinston } from './config/configure-winston.js';
import helmet from 'helmet';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const allowedOrigins = [`http://localhost:${process.env.PORT}`];
  
  app.use(helmet());
  
  app.enableCors({
    origin: (origin: any, callback: any) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new InternalServerErrorException('Request rejected by CORS.'));
      }
    },
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    credentials: true,
  });

  configureWinston(app);

  const port = Number(process.env.PORT);
  if (!Number.isInteger(port) || port <= 0 || port > 65535) {
    throw new Error(`La variable PORT doit contenir un port valide. Invalide => (${process.env.PORT})`);
  }
  
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  app.useGlobalInterceptors(new ExecutionTimeInterceptor());
  
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter);
  
  configureSwagger(app);
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
