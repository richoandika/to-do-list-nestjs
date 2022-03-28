import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './repository/users.repository';
import { PrismaModule } from 'nestjs-prisma';
import { PasswordService } from './../auth/password.service';
import config from './../common/configs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
    }),
    PrismaModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, PasswordService],
})
export class UsersModule {}
