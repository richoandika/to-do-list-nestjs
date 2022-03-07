import { TodosService } from './todos.service';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { CreateTodoDto } from './dto/create-todo.dto';
import { FilterTodoDto } from './dto/filter-todo.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Version,
} from '@nestjs/common';

@Controller('todos')
export class TodosController {
  constructor(private todosService: TodosService) {}

  @Version('1')
  @Get()
  findAllV1(@Query() filterTodoDto?: FilterTodoDto) {
    return this.todosService.findAllV1(filterTodoDto);
  }

  @Version('1')
  @Post()
  createV1(@Body() createTodoDto: CreateTodoDto) {
    return this.todosService.createV1(createTodoDto);
  }

  @Version('1')
  @Get(':id')
  findV1(@Param('id') id: string) {
    return this.todosService.findV1(id);
  }

  @Version('1')
  @Put(':id')
  updateV1(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todosService.updateV1(id, updateTodoDto);
  }

  @Version('1')
  @Delete(':id')
  deleteV1(@Param('id') id: string) {
    return this.todosService.deleteV1(id);
  }
}
