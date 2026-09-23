import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function configureSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('Campus API')
    .setDescription('API REST de gestion de données pour des locations et revue de camping.')
    .setVersion('1.0.0')
    .addTag('Locations', 'Gestion des emplacements')
    .addTag('Ratng', 'Gestion des appréciations')
    .addTag('Health', 'État du service')
    .build();

  const documentFactory = () =>
    SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, documentFactory, {
    jsonDocumentUrl: 'docs/openapi.json',
    customSiteTitle: 'Campus API — Documentation',
  });
}