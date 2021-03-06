import { Expose } from 'class-transformer';
import {
  IsBooleanString,
  IsDateString,
  IsOptional,
  IsString,
} from 'class-validator';

export class FilterTodoDto {
  @IsOptional()
  @IsString()
  readonly title?: string;

  @IsOptional()
  @IsDateString()
  readonly date?: string;

  @IsOptional()
  @IsBooleanString()
  readonly is_completed?: string;
}
