import { IntersectionType } from '@nestjs/mapped-types';
import { IsBoolean, IsNotEmpty } from 'class-validator';
import { CreateTodoDto } from './create-todo.dto';

export class AdditionalUpdateTodoDto {
  @IsNotEmpty()
  @IsBoolean()
  readonly is_completed: boolean;
}

export class UpdateTodoDto extends IntersectionType(
  CreateTodoDto,
  AdditionalUpdateTodoDto,
) {}
