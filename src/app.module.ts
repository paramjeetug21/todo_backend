import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { DatabaseModule } from 'database/database.module';

@Module({
  imports: [DatabaseModule, UserModule, TaskModule],
})
export class AppModule {}
