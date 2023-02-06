import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import express = require('express');
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const config = app.get(ConfigService);
  // const port = config.get('APP_PORT');
  const port = 3000;

  app.enableCors();
  app.use('/public', express.static(join(__dirname, '..', 'public')));
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe()); // enable ValidationPipe`
  await app.listen(port).then(() => {
    console.log(`App listening on ${port}`);
  });

}
bootstrap();
