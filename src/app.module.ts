import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { DatabaseModule } from './database/database.module';
import { Basic } from './src.controller';

@Module({
  controllers: [Basic],
  imports: [DatabaseModule, UserModule, TaskModule],
})
export class AppModule {}
