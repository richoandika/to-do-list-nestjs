import { Injectable } from '@nestjs/common';
import { Todo } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { CreateTodoDto } from '../dto/create-todo.dto';
import { FilterTodoDto } from '../dto/filter-todo.dto';
import { UpdateTodoDto } from '../dto/update-todo.dto';

@Injectable()
export class TodosRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(filterTodoDto: FilterTodoDto): Promise<Todo[]> {
    const { title, date, is_completed } = filterTodoDto;
    return await this.prisma.todo.findMany({
      where: {
        AND: [
          {
            title: { contains: title || undefined },
          },
          {
            created_at: { equals: date ? new Date(date) : undefined },
          },
          {
            is_completed: {
              equals: is_completed === 'true' ? true : false || undefined,
            },
          },
        ],
      },
      orderBy: { created_at: 'asc' },
    });
  }

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    return await this.prisma.todo.create({ data: createTodoDto });
  }

  async find(id: number): Promise<Todo> {
    return await this.prisma.todo.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    return await this.prisma.todo.update({
      where: { id },
      data: updateTodoDto,
    });
  }

  async delete(id: number): Promise<Todo> {
    return await this.prisma.todo.delete({
      where: { id },
    });
  }
}
