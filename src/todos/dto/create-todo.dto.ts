import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty()
  @Length(3)
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @Length(3)
  @IsString()
  readonly body: string;
}
