import { Injectable } from '@nestjs/common';
import { Todo } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { FilterTodoDto } from '../dto/filter-todo.dto';
import { UpdateTodoDto } from '../dto/update-todo.dto';

@Injectable()
export class TodosRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAllWithUserId(
    userId,
    filterTodoDto: FilterTodoDto,
  ): Promise<Todo[]> {
    const { title, date, is_completed } = filterTodoDto;
    return await this.prisma.todo.findMany({
      where: {
        AND: [
          {
            user_id: { equals: userId || undefined },
          },
          {
            title: { contains: title || undefined },
          },
          {
            created_at: { equals: date ? new Date(date) : undefined },
          },
          {
            is_completed: {
              equals: is_completed == 'true' || undefined,
            },
          },
        ],
      },
      orderBy: { created_at: 'asc' },
    });
  }

  async create(createTodoDto): Promise<Todo> {
    return await this.prisma.todo.create({ data: createTodoDto });
  }

  async findWithUserId(userId: string, todoId: string): Promise<Todo> {
    return await this.prisma.todo.findFirst({
      where: {
        AND: [
          {
            user_id: { equals: userId },
          },
          {
            id: { equals: todoId },
          },
        ],
      },
    });
  }

  async update(id: string, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    return await this.prisma.todo.update({
      where: { id },
      data: updateTodoDto,
    });
  }

  async remove(id: string): Promise<Todo> {
    return await this.prisma.todo.delete({
      where: { id },
    });
  }
}
