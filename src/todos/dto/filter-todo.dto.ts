import {
  IsBooleanString,
  IsDateString,
  IsOptional,
  IsString,
} from 'class-validator';

export class FilterTodoDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsDateString()
  date?: string;

  @IsOptional()
  @IsBooleanString()
  is_completed?: string;
}
