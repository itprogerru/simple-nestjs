import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import * as uuid from 'uuid/v1';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

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
   * Возвращает все задачи или только те удовлетворяющие фильтром
   * @param filterDto
   */
  getTaskWithFilters(filterDto: GetTasksFilterDto): Task[] {
    const {status, search } = filterDto;
    let tasks = this.getAllTasks();
    if (status) {
      tasks = tasks.filter(task => task.status === status);
    }
    if (search) {
      tasks = tasks.filter(task => task.title.includes(search) || task.description.includes(search));
    }
    return tasks;
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

  /**
   * Удаление задачи
   * @param id
   */
  deleteTaskById(id: string): void {  // void если ничего не возвращает
    this.tasks = this.tasks.filter(task => task.id !== id);
  }

  updateTaskStatusById(id: string, status: TaskStatus) {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }
}
