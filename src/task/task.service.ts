import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { Todos } from './task.entity';
import { CreateTaskDto } from './task.dto';

@Injectable()
export class TaskService {
  constructor(
    @Inject('TODOS')
    private readonly todoModel: typeof Todos,
  ) {}

  async addTask(dto: CreateTaskDto) {
    try {
      const task = await this.todoModel.create({ ...dto });
      return { task };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async markTaskDone(id: string) {
    try {
      const task = await this.todoModel.findByPk(id);
      if (!task) {
        throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
      }
      task.todoDone = true;
      await task.save();

      return;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
