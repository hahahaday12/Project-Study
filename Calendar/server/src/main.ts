import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ValidatorOptions } from 'class-validator';
import { AppModule } from './app.module';
import { setupSwagger } from './modules/util/setupSwagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const validatorOptions: ValidatorOptions = {
    forbidNonWhitelisted: true,
    enableDebugMessages: true,
  };
  setupSwagger(app);
  app.enableCors({
    origin: true,
    methods: ['POST', 'GET', 'PATCH', 'PUT', 'OPTIONS', 'DELETE'],
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe(validatorOptions));
  await app.listen(3008);
}
bootstrap();
