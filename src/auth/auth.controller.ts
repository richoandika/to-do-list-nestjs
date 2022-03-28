import {
  Body,
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
  Version,
} from '@nestjs/common';
import { Public } from './../common/decorators/public-access.decorator';
import { JwtAuthGuard } from './../common/guards/jwt-auth.guard';
import { RoleUserGuard } from './../common/guards/role-user.guard';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RefreshAuthDto } from './dto/refresh-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { ResponseTransformInterceptor } from './../common/interceptors/response-transform.interceptor';

@Controller('auth')
@Public()
@UseGuards(JwtAuthGuard, RoleUserGuard)
@UsePipes(new ValidationPipe())
@UseInterceptors(ResponseTransformInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Version('1')
  @Post('login')
  loginV1(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.loginV1(loginAuthDto);
  }

  @Version('1')
  @Post('register')
  registerV1(@Body() registerAuthDto: RegisterAuthDto) {
    return this.authService.registerV1(registerAuthDto);
  }

  @Version('1')
  @Post('refresh')
  refreshV1(@Body() refreshAuthDto: RefreshAuthDto) {
    return this.authService.refreshToken(refreshAuthDto);
  }
}
