import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { Todos } from './task.entity';
import { User } from '../user/user.entity';
import { catsProviders } from './task.provider';

@Module({
  imports: [],
  controllers: [TaskController],
  providers: [TaskService, ...catsProviders],
  exports: [TaskService],
})
export class TaskModule {}
