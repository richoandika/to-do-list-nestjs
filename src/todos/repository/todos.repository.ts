import { Injectable } from '@nestjs/common';
import { Todo } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTodoDto } from '../dto/create-todo.dto';
import { FilterTodoDto } from '../dto/filter-todo.dto';

@Injectable()
export class TodosRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(filterTodoDto: FilterTodoDto): Promise<Todo[]> {
    const { title, date: createdAt, is_completed: isCompleted } = filterTodoDto;
    return await this.prisma.todo.findMany({
      where: {
        AND: [
          {
            title: { contains: title || undefined },
          },
          // {
          //   createdAt: { equals: createdAt || undefined },
          // },
          // {
          //   isCompleted: { equals: Boolean(isCompleted) || undefined },
          // },
        ],
      },
      orderBy: { createdAt: 'asc' },
    });
  }

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    return await this.prisma.todo.create({
      data: createTodoDto,
    });
  }

  async find(id: string): Promise<Todo> {
    return await this.prisma.todo.findUnique({
      where: { id: Number(id) || undefined },
    });
  }

  async update(id: string, data: object) {
    return await this.prisma.todo.update({
      where: { id: Number(id) || undefined },
      data,
    });
  }

  async delete(id: string) {
    return await this.prisma.todo.delete({
      where: { id: Number(id) || undefined },
    });
  }
}
