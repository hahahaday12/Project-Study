import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { AuthorizationGuard } from '../guards/authorization.guard';
import { DiaryService } from './diary.service';
import { CreateDiaryDto } from './dto/create-diary.dto';
import { UpdateDiaryDto } from './dto/update-diary.dto';
import { GetUser } from '../util/getUserId';
import { ErrorResponse } from '../util/common-error-decorator';
import { CommonError } from '../util/schema/common-error.definition.dto';

@Controller('diary')
@ApiTags('diary')
@UseGuards(AuthorizationGuard)
@ApiBearerAuth('jwt')
export class DiaryController {
  constructor(private readonly diaryService: DiaryService) {}

  @Post()
  @ApiOperation({
    summary: '다이어리 생성',
    description: '다이어리를 생성합니다.',
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
  createDiary(@Body() createDiaryDto: CreateDiaryDto, @GetUser() user: any) {
    return this.diaryService.createDiary(createDiaryDto, user);
  }

  @Get()
  @ApiOperation({
    summary: '다이어리 조회',
    description: '다이어리 목록을 조회합니다.',
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
  getDiary(@GetUser() user: any) {
    return this.diaryService.getDiary(user);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    description: '삭제할 다이어리의 _id (ObjectId)',
  })
  @ApiOperation({
    summary: '다이어리 삭제',
    description: '다이어리를 삭제합니다.',
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
    return this.diaryService.deleteDiary(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: '다이어리 정보 변경',
    description: '다이어리 정보를 변경합니다.',
  })
  @ApiParam({
    name: 'id',
    description: '변경할 다이어리의 _id (ObjectId)',
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
  updateDiary(@Param('id') id: string, @Body() updateDiaryDto: UpdateDiaryDto) {
    return this.diaryService.updateDiary(id, updateDiaryDto);
  }
}
