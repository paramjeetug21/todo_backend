// src/main.ts (Serverless Vercel fix)
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

// We must create an Express instance to bridge NestJS with Vercel's handler
const expressApp = express();

async function bootstrap() {
  // Use the Express adapter to create the NestJS app
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp),
  );

  app.enableCors({
    origin: 'https://new-nine-silk-25.vercel.app',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // Initialize the app. We DO NOT call app.listen() here.
  await app.init();

  // Return the underlying Express application instance
  return expressApp;
}

// Export the boostrap function, which Vercel will call to get the handler
let serverPromise: Promise<any>;
export default async function handler(req: any, res: any) {
  if (!serverPromise) {
    serverPromise = bootstrap();
  }
  const server = await serverPromise;
  // Express handles the request/response now
  server(req, res);
}
