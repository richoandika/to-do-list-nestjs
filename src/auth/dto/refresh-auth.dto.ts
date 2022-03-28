import { IsJWT, IsNotEmpty } from 'class-validator';

export class RefreshAuthDto {
  @IsNotEmpty()
  @IsJWT()
  readonly refresh_token: string;
}
