import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';

/**
 * Контроллер REST API запросов tasks
 */
@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get('/all')
  getAllTasks(): Task[] { // описание интерфейса в task
    return this.taskService.getAllTasks();
  }

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Task[] { // описание интерфейса в task
    if (Object.keys(filterDto).length) {
      return this.taskService.getTaskWithFilters(filterDto);
    } else {
      return this.taskService.getAllTasks();
    }
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.taskService.getTaskById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.taskService.createTask(createTaskDto);
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string) {
    this.taskService.deleteTaskById(id);
    return { message: ` task ${id} deleted `};
  }

  @Patch('/:id/status')
  updateTaskStatusById(
    @Param('id') id: string,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
  ): Task {
    return this.taskService.updateTaskStatusById(id, status);
  }
}
