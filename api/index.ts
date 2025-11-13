import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const expressApp = express();

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp),
  );

  app.enableCors({
    origin: 'https://new-nine-silk-25.vercel.app',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.init();
  return expressApp;
}

let serverPromise: Promise<any>;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!serverPromise) {
    serverPromise = bootstrap();
  }
  const server = await serverPromise;
  server(req, res);
}
