import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'https://new-nine-silk-25.vercel.app', // your frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true, // if you want to send cookies/auth headers
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
