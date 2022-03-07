import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { TodosModule } from './todos/todos.module';

@Module({
  imports: [TodosModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
