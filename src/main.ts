import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Challenge API - Dentro da História')
    .setDescription('API para solicitação de dados do cliente - LGPD Agosto/2020')
    .build();
    const custom = {
      //customJs: '/assets/script.js',
      //customCssUrl: '/assets/style.css'
    };
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('documentacao', app, document, custom);

  app.enableCors();
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
