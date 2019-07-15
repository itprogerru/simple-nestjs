import { Controller, Get } from '@nestjs/common';
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
}
