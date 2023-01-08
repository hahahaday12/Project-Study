import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
  HttpStatus,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiProperty,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { AuthorizationGuard } from '../guards/authorization.guard';
import { GetUser } from '../util/getUserId';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ErrorResponse } from '../util/common-error-decorator';
import { CommonError } from '../util/schema/common-error.definition.dto';

@Controller('todo')
@ApiTags('todo')
@UseGuards(AuthorizationGuard)
@ApiBearerAuth('jwt')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  @ApiOperation({ summary: '할 일 생성', description: '할 일을 생성합니다.' })
  @ErrorResponse(HttpStatus.BAD_REQUEST, CommonError.VALIDATION_FAILURE)
  @ErrorResponse(HttpStatus.NON_AUTHORITATIVE_INFORMATION, [
    CommonError.UNAUTHORIZED_EXPIRED,
    CommonError.UNAUTHORIZED_INVALID,
  ])
  @ErrorResponse(
    HttpStatus.PRECONDITION_FAILED,
    CommonError.UNAUTHORIZED_PRECONDITION_FAILED,
  )
  @ErrorResponse(
    HttpStatus.SERVICE_UNAVAILABLE,
    CommonError.SERVICE_UNAVAILABLE,
  )
  createTodo(@Body() createTodoDto: CreateTodoDto, @GetUser() user: any) {
    return this.todoService.createTodo(createTodoDto, user);
  }

  @Get()
  @ApiOperation({
    summary: '할 일 조회',
    description: '할 일 목록을 조회합니다.',
  })
  @ApiQuery({
    name: 'year',
    description: '조회할 년도를 YYYY 형식으로 입력합니다.',
    required: false,
    example: '2022',
  })
  @ApiQuery({
    name: 'month',
    description: '조회할 월을 MM 형식으로 입력합니다.',
    required: false,
    example: '12',
  })
  @ErrorResponse(HttpStatus.BAD_REQUEST, CommonError.VALIDATION_FAILURE)
  @ErrorResponse(HttpStatus.NON_AUTHORITATIVE_INFORMATION, [
    CommonError.UNAUTHORIZED_EXPIRED,
    CommonError.UNAUTHORIZED_INVALID,
  ])
  @ErrorResponse(
    HttpStatus.PRECONDITION_FAILED,
    CommonError.UNAUTHORIZED_PRECONDITION_FAILED,
  )
  @ErrorResponse(
    HttpStatus.SERVICE_UNAVAILABLE,
    CommonError.SERVICE_UNAVAILABLE,
  )
  getTodo(
    @GetUser() user: any,
    @Query('year') year?: string,
    @Query('month') month?: string,
  ) {
    return this.todoService.getTodo(user.id, year, month);
  }

  @Delete(':id')
  @ApiOperation({ summary: '할 일 삭제', description: '할 일을 삭제합니다.' })
  @ApiParam({
    name: 'id',
    description: '삭제할 할 일의 _id (ObjectId)',
  })
  @ErrorResponse(HttpStatus.BAD_REQUEST, CommonError.VALIDATION_FAILURE)
  @ErrorResponse(HttpStatus.NON_AUTHORITATIVE_INFORMATION, [
    CommonError.UNAUTHORIZED_EXPIRED,
    CommonError.UNAUTHORIZED_INVALID,
  ])
  @ErrorResponse(
    HttpStatus.PRECONDITION_FAILED,
    CommonError.UNAUTHORIZED_PRECONDITION_FAILED,
  )
  @ErrorResponse(
    HttpStatus.SERVICE_UNAVAILABLE,
    CommonError.SERVICE_UNAVAILABLE,
  )
  deleteDiary(@Param('id') id: string) {
    return this.todoService.deleteTodo(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: '할 일 변경',
    description: '할 일 정보를 변경합니다.',
  })
  @ApiParam({
    name: 'id',
    description: '삭제할 할 일의 _id (ObjectId)',
  })
  @ErrorResponse(HttpStatus.BAD_REQUEST, CommonError.VALIDATION_FAILURE)
  @ErrorResponse(HttpStatus.NON_AUTHORITATIVE_INFORMATION, [
    CommonError.UNAUTHORIZED_EXPIRED,
    CommonError.UNAUTHORIZED_INVALID,
  ])
  @ErrorResponse(
    HttpStatus.PRECONDITION_FAILED,
    CommonError.UNAUTHORIZED_PRECONDITION_FAILED,
  )
  @ErrorResponse(
    HttpStatus.SERVICE_UNAVAILABLE,
    CommonError.SERVICE_UNAVAILABLE,
  )
  updateDiary(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.updateTodo(id, updateTodoDto);
  }
}
