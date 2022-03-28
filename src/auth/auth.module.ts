import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PasswordService } from './password.service';
import { AuthRepository } from './repository/auth.repository';
import { SecurityConfig } from './../common/configs/config.interface';
import { JwtStrategy } from './../common/strategies/jwt.strategy';
import config from './../common/configs/config';
import { PrismaModule } from 'nestjs-prisma';
import { UsersModule } from './../users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const securityConfig = configService.get<SecurityConfig>('security');
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
  exports: [PasswordService],
})
export class AuthModule {}
