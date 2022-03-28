import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { SecurityConfig } from 'src/common/configs/config.interface';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RefreshAuthDto } from './dto/refresh-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { JwtPayload } from './interface/jwt-payload.interface';
import { PasswordService } from './password.service';
import { AuthRepository } from './repository/auth.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly passwordService: PasswordService,
  ) {}

  async loginV1(loginAuthDto: LoginAuthDto) {
    const { email, password } = loginAuthDto;
    try {
      const user = await this.authRepository.findEmail(email);
      if (!user) {
        throw new NotFoundException(`No user found for email: ${email}`);
      }
      const passwordValid = await this.passwordService.validatePassword(
        password,
        user.password,
      );
      if (!passwordValid) {
        throw new BadRequestException('Invalid password');
      }
      if (!user.is_active) {
        throw new ForbiddenException('Your account has been blocked');
      }
      return this.generateTokens({ user_id: user.id });
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async registerV1(registerAuthDto: RegisterAuthDto) {
    try {
      const data = {
        ...registerAuthDto,
        password: await this.passwordService.hashPassword(
          registerAuthDto.password,
        ),
        is_active: true,
      };
      const user = await this.authRepository.register(data);
      return this.generateTokens({ user_id: user.id });
    } catch (e) {
      if (e?.code == 'P2002') {
        throw new BadRequestException(`Duplicate ${e.meta.target}`);
      }
      throw new InternalServerErrorException(e);
    }
  }

  validateUser(payload: JwtPayload) {
    const { user_id } = payload;
    return this.authRepository.findId(user_id);
  }

  refreshToken(refreshAuthDto: RefreshAuthDto) {
    try {
      const { refresh_token } = refreshAuthDto;
      const { user_id } = this.jwtService.verify(refresh_token, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
      });
      return this.generateTokens({ user_id });
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  generateTokens(payload: JwtPayload) {
    return {
      accessToken: this.generateAccessToken(payload),
      refreshToken: this.generateRefreshToken(payload),
    };
  }

  private generateAccessToken(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }

  private generateRefreshToken(payload: JwtPayload) {
    const securityConfig = this.configService.get<SecurityConfig>('security');
    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: securityConfig.refreshIn,
    });
  }
}
