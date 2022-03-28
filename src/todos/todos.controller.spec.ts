import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from 'nestjs-prisma';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { TodosRepository } from './repository/todos.repository';
import config from './../common/configs/config';

describe('TodoController', () => {
  let controller: TodosController;
  let service: TodosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [config],
        }),
        PrismaModule,
      ],
      controllers: [TodosController],
      providers: [TodosService, TodosRepository],
    }).compile();

    controller = module.get<TodosController>(TodosController);
    service = module.get<TodosService>(TodosService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
