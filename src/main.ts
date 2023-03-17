import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('App');
  app.useLogger(logger);

  const options = new DocumentBuilder().setTitle('Mobile Reality').build();

  SwaggerModule.setup(
    'explorer',
    app,
    SwaggerModule.createDocument(app, options),
  );

  await app.listen(3000);
  logger.log(`Application is listening on ${await app.getUrl()}`);
}
bootstrap();
