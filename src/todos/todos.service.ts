import { CreateTodoDto } from './dto/create-todo.dto';
import { FilterTodoDto } from './dto/filter-todo.dto';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from '@prisma/client';
import { TodosRepository } from './repository/todos.repository';

@Injectable()
export class TodosService {
  constructor(private readonly todosRepository: TodosRepository) {}

  async findAllV1(filterTodoDto: FilterTodoDto): Promise<Todo[] | void> {
    try {
      return await this.todosRepository.findAll(filterTodoDto);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async createV1(createTodoDto: CreateTodoDto): Promise<void> {
    try {
      await this.todosRepository.create(createTodoDto);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findV1(id: number): Promise<Todo> {
    try {
      const todo = await this.todosRepository.find(id);
      if (!todo) {
        throw new NotFoundException();
      }
      return todo;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async updateV1(id: number, updateTodoDto: UpdateTodoDto): Promise<void> {
    try {
      const todo = await this.todosRepository.find(id);
      if (!todo) {
        throw new NotFoundException();
      }
      await this.todosRepository.update(id, updateTodoDto);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async deleteV1(id: number): Promise<void> {
    try {
      const todo = await this.todosRepository.find(id);
      if (!todo) {
        throw new NotFoundException();
      }
      await this.todosRepository.delete(id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
