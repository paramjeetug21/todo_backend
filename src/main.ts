import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import type { VercelRequest, VercelResponse } from '@vercel/node';

let cachedServer: any;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!cachedServer) {
    const app = await NestFactory.create(AppModule);
    app.enableCors({
      origin: 'https://new-nine-silk-25.vercel.app',
      methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
      credentials: true,
    });
    await app.init();
    cachedServer = app.getHttpAdapter().getInstance();
  }
  return cachedServer(req, res);
}
