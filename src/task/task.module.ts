import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { catsProviders } from './task.provider';

@Module({
  imports: [],
  controllers: [TaskController],
  providers: [TaskService, ...catsProviders],
  exports: [TaskService],
})
export class TaskModule {}
