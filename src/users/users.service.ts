import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { PasswordService } from './../auth/password.service';
import { CreateUserDto } from './dto/create-user.dto';
import { FilterUserDto } from './dto/filter-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './repository/users.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly passwordService: PasswordService,
    private readonly usersRepository: UsersRepository,
  ) {}

  async createV1(createUserDto: CreateUserDto): Promise<User> {
    try {
      const data = {
        ...createUserDto,
        password: await this.passwordService.hashPassword(
          createUserDto.password,
        ),
        is_active: true,
      };
      return await this.usersRepository.create(data);
    } catch (e) {
      if (e?.code == 'P2002') {
        throw new BadRequestException(`Duplicate ${e.meta.target}`);
      }
      throw new InternalServerErrorException(e);
    }
  }

  async findAllV1(filterUserDto: FilterUserDto): Promise<User[]> {
    try {
      return await this.usersRepository.findAll(filterUserDto);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async findOneV1(id: string): Promise<User> {
    try {
      const user = await this.usersRepository.find(id);
      if (!user) {
        throw new NotFoundException();
      }
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async updateV1(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const user = await this.usersRepository.find(id);
      if (!user) {
        throw new NotFoundException();
      }
      return await this.usersRepository.update(id, updateUserDto);
    } catch (e) {
      if (e?.code == 'P2002') {
        throw new BadRequestException(`Duplicate ${e.meta.target}`);
      }
      throw new InternalServerErrorException(e);
    }
  }

  async removeV1(id: string): Promise<User> {
    try {
      const user = await this.usersRepository.find(id);
      if (!user) {
        throw new NotFoundException();
      }
      return await this.usersRepository.remove(id);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
