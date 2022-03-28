import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from 'nestjs-prisma';
import config from './../common/configs/config';
import { SecurityConfig } from './../common/configs/config.interface';
import { JwtStrategy } from './../common/strategies/jwt.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PasswordService } from './password.service';
import { AuthRepository } from './repository/auth.repository';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [config],
        }),
        PassportModule,
        JwtModule.registerAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: async (configService: ConfigService) => {
            const securityConfig =
              configService.get<SecurityConfig>('security');
            return {
              secret: configService.get<string>('JWT_ACCESS_SECRET'),
              signOptions: {
                expiresIn: securityConfig.expiresIn,
              },
            };
          },
        }),
        PrismaModule,
      ],
      controllers: [AuthController],
      providers: [AuthService, AuthRepository, JwtStrategy, PasswordService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be successfully login', () => {
    expect(controller.loginV1);
  });
});
