import { Body, Controller, Get, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';

/**
 * Контроллер REST API запросов tasks
 */
@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getAllTasks(): Task[] { // описание интерфейса в task
    return this.taskService.getAllTasks();
  }

  @Post()
  createTask(
    @Body('title') title: string, // Описание поля который придет в body и название переменной которая передасться в функцию
    @Body('description') description: string,
  ): Task {
    return this.taskService.createTask(title, description);
  }
}
