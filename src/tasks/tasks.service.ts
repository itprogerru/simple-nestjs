import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import * as uuid from 'uuid/v1';

@Injectable()
export class TasksService {
  private tasks: Task[] = []; // описание интерфейса задачи

  /**
   * Возвращает все задачи
   * @return Task[]
   */
  getAllTasks(): Task[] {   // вывод задачи в интерфейсе задачи
    return this.tasks;
  }

  /**
   * Создает задачу и пуляет её в масив задач и возвращает созданную данныую задачу
   * @param title
   * @param description
   * @return Task
   */
  createTask(title: string, description: string): Task {
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;

  }
}
