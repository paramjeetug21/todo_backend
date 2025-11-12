import { Body, Controller, Post, Patch, Param } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './task.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  // ✅ Add new task
  @Post('add')
  async addTask(@Body() dto: CreateTaskDto) {
    return await this.taskService.addTask(dto);
  }

  // ✅ Mark task as done (instead of delete)
  @Patch(':id')
  async markTaskDone(@Param('id') id: string) {
    console.log('patch callled !');
    return await this.taskService.markTaskDone(id);
  }
}
