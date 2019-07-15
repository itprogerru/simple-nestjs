import { Injectable } from '@nestjs/common';
import { Task } from './task.model';

@Injectable()
export class TasksService {
  private tasks: Task[] = []; // описание интерфейса задачи

  getAllTasks(): Task[] {   // вывод задачи в интерфейсе задачи
    return this.tasks;
  }
}
