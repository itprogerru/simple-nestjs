
import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { TaskStatus } from '../task-status.enum';

export class GetTasksFilterDto {
  @IsOptional() // если есть то должен удовлетвоять требуовонаю из массива status, Опционально - если есть то валидация если нет то хуй с ним.
  @IsIn(Object.keys(TaskStatus).map(key => TaskStatus[key]))
  status: TaskStatus;

  @IsOptional() // если есть то не пустое
  @IsNotEmpty()
  search: string;
}
