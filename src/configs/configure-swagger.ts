import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function configureSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('Campus API')
    .setDescription('API RESTful de gestion de données pour des emplacements et ses appréciations.')
    .setVersion('1.1.2')
    .addTag('Health', 'État du service')
    .addBearerAuth()
    .build();

  const documentFactory = () =>
    SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, documentFactory, {
    jsonDocumentUrl: 'docs/openapi.json',
    customSiteTitle: 'Campus API — Documentation',
  });
}