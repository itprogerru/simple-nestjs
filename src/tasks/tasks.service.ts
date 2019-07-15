import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import * as uuid from 'uuid/v1';
import { CreateTaskDto } from './dto/create-task.dto';

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
   * Получение задачи по task id
   * @param id
   * @return Task
   */
  getTaskById(id: string): Task {
    return this.tasks.find(task => task.id === id);
  }

  /**
   * Создает задачу и пуляет её в масив задач и возвращает созданную данныую задачу
   * @param createTaskDto
   * @return Task
   */
  createTask(createTaskDto: CreateTaskDto): Task {
    const {title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;

  }

  deleteTaskById(id: string): void {  // void если ничего не возвращает
    this.tasks = this.tasks.filter(task => task.id !== id);
  }
}
