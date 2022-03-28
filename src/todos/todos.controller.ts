import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
  Version,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { TodosService } from './todos.service';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { CreateTodoDto } from './dto/create-todo.dto';
import { FilterTodoDto } from './dto/filter-todo.dto';
import { ProfileUser } from './../common/decorators/profile-user.decorator';
import { JwtAuthGuard } from './../common/guards/jwt-auth.guard';
import { RoleUserGuard } from './../common/guards/role-user.guard';
import { ResponseTransformInterceptor } from './../common/interceptors/response-transform.interceptor';

@Controller('todos')
@UseGuards(JwtAuthGuard, RoleUserGuard)
@UsePipes(new ValidationPipe())
@UseInterceptors(ResponseTransformInterceptor)
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Version('1')
  @Post()
  createV1(@ProfileUser() user: User, @Body() createTodoDto: CreateTodoDto) {
    return this.todosService.createV1(user, createTodoDto);
  }

  @Version('1')
  @Get()
  findAllV1(@ProfileUser() user: User, @Query() filterTodoDto?: FilterTodoDto) {
    return this.todosService.findAllV1(user, filterTodoDto);
  }

  @Version('1')
  @Get(':id')
  findOneV1(@ProfileUser() user: User, @Param('id', ParseUUIDPipe) id: string) {
    return this.todosService.findOneV1(user, id);
  }

  @Version('1')
  @Put(':id')
  updateV1(
    @ProfileUser() user: User,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTodoDto: UpdateTodoDto,
  ) {
    return this.todosService.updateV1(user, id, updateTodoDto);
  }

  @Version('1')
  @Delete(':id')
  removeV1(@ProfileUser() user: User, @Param('id', ParseUUIDPipe) id: string) {
    return this.todosService.removeV1(user, id);
  }
}
