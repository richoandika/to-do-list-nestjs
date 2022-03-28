import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Version,
  Query,
  UseGuards,
  UseInterceptors,
  ParseUUIDPipe,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { FilterUserDto } from './dto/filter-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RoleUser } from './../common/decorators/role-user.decorator';
import { JwtAuthGuard } from './../common/guards/jwt-auth.guard';
import { RoleUserGuard } from './../common/guards/role-user.guard';
import { ResponseTransformInterceptor } from './../common/interceptors/response-transform.interceptor';

@Controller('users')
@UseGuards(JwtAuthGuard, RoleUserGuard)
@UsePipes(new ValidationPipe())
@UseInterceptors(ResponseTransformInterceptor)
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Version('1')
  @Post()
  @RoleUser('ADMIN')
  createV1(@Body() createUserDto: CreateUserDto) {
    return this.userService.createV1(createUserDto);
  }

  @Version('1')
  @Get()
  @RoleUser('ADMIN')
  findAllV1(@Query() filterUserDto?: FilterUserDto) {
    return this.userService.findAllV1(filterUserDto);
  }

  @Version('1')
  @Get(':id')
  @RoleUser('ADMIN')
  findOneV1(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.findOneV1(id);
  }

  @Version('1')
  @Put(':id')
  @RoleUser('ADMIN')
  updateV1(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateV1(id, updateUserDto);
  }

  @Version('1')
  @Delete(':id')
  @RoleUser('ADMIN')
  removeV1(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.removeV1(id);
  }
}
