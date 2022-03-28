import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class RegisterAuthDto {
  @IsNotEmpty()
  @Length(3, 20)
  @IsString()
  readonly first_name: string;

  @IsNotEmpty()
  @Length(3, 20)
  @IsString()
  readonly last_name: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @Length(3, 20)
  @IsString()
  readonly password: string;
}
