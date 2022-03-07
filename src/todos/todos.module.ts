import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TodosRepository } from './repository/todos.repository';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';

@Module({
  imports: [PrismaModule],
  controllers: [TodosController],
  providers: [TodosService, TodosRepository],
})
export class TodosModule {}
