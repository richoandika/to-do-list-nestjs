import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'nestjs-prisma';
import { TodosController } from './todos.controller';
import { TodosRepository } from './repository/todos.repository';
import { TodosService } from './todos.service';
import config from './../common/configs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
    }),
    PrismaModule,
  ],
  controllers: [TodosController],
  providers: [TodosService, TodosRepository],
})
export class TodosModule {}
