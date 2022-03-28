import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { CreateUserDto } from '../dto/create-user.dto';
import { FilterUserDto } from '../dto/filter-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(filterUserDto: FilterUserDto): Promise<User[]> {
    const { first_name, last_name, date, is_active } = filterUserDto;
    return await this.prisma.user.findMany({
      where: {
        AND: [
          {
            first_name: { contains: first_name },
          },
          {
            last_name: { contains: last_name },
          },
          {
            created_at: { equals: date ? new Date(date) : undefined },
          },
          {
            is_active: {
              equals: is_active == 'true',
            },
          },
        ],
      },
      orderBy: { created_at: 'asc' },
    });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.prisma.user.create({ data: createUserDto });
  }

  async find(id: string): Promise<User> {
    return await this.prisma.user.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: string): Promise<User> {
    return await this.prisma.user.delete({
      where: { id },
    });
  }
}
