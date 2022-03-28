import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { RegisterAuthDto } from '../dto/register-auth.dto';

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  async register(registerAuthDto: RegisterAuthDto) {
    return await this.prisma.user.create({ data: registerAuthDto });
  }

  async findId(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findEmail(email: string) {
    return await this.prisma.user.findUnique({ where: { email } });
  }
}
