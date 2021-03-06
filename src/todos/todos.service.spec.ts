import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from 'nestjs-prisma';
import { TodosService } from './todos.service';
import { TodosRepository } from './repository/todos.repository';
import config from './../common/configs/config';

describe('TodosService', () => {
  let service: TodosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [config],
        }),
        PrismaModule,
      ],
      providers: [TodosService, TodosRepository],
    }).compile();

    service = module.get<TodosService>(TodosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
