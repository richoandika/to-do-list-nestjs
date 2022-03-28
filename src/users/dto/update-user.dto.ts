import { IntersectionType, OmitType } from '@nestjs/mapped-types';
import { IsBoolean, IsNotEmpty } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class AdditionalUpdateUserDto {
  @IsNotEmpty()
  @IsBoolean()
  readonly is_active: boolean;
}

export class UpdateUserDto extends IntersectionType(
  OmitType(CreateUserDto, ['email']),
  AdditionalUpdateUserDto,
) {}
