import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty()
  @MinLength(3)
  @IsString()
  title: string;

  @IsNotEmpty()
  @MinLength(3)
  @IsString()
  body: string;
}
