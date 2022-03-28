import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Todo, User } from '@prisma/client';
import { TodosRepository } from './repository/todos.repository';
import { CreateTodoDto } from './dto/create-todo.dto';
import { FilterTodoDto } from './dto/filter-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodosService {
  constructor(private readonly todosRepository: TodosRepository) {}

  async findAllV1(
    user: User,
    filterTodoDto: FilterTodoDto,
  ): Promise<Todo[] | void> {
    try {
      return await this.todosRepository.findAllWithUserId(
        user.id,
        filterTodoDto,
      );
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async createV1(user: User, createTodoDto: CreateTodoDto): Promise<Todo> {
    try {
      const data = {
        ...createTodoDto,
        user_id: user.id,
      };
      return await this.todosRepository.create(data);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async findOneV1(user: User, todoId: string): Promise<Todo> {
    try {
      const todo = await this.todosRepository.findWithUserId(user.id, todoId);
      if (!todo) {
        throw new NotFoundException();
      }
      return todo;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async updateV1(
    user: User,
    todoId: string,
    updateTodoDto: UpdateTodoDto,
  ): Promise<Todo> {
    try {
      const todo = await this.todosRepository.findWithUserId(user.id, todoId);
      if (!todo) {
        throw new NotFoundException();
      }
      return await this.todosRepository.update(todoId, updateTodoDto);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async removeV1(user: User, todoId: string): Promise<Todo> {
    try {
      const todo = await this.todosRepository.findWithUserId(user.id, todoId);
      if (!todo) {
        throw new NotFoundException();
      }
      return await this.todosRepository.remove(todoId);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
