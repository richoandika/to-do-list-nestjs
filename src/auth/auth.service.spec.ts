import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from 'nestjs-prisma';
import { AuthService } from './auth.service';
import { AuthRepository } from './repository/auth.repository';
import { PasswordService } from './password.service';
import config from './../common/configs/config';
import { SecurityConfig } from './../common/configs/config.interface';
import { JwtStrategy } from './../common/strategies/jwt.strategy';

describe('AuthService', () => {
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
      providers: [AuthService, AuthRepository, JwtStrategy, PasswordService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
