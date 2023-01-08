import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsIn, IsISO8601, IsOptional, IsString } from 'class-validator';

const Statuses = ['todo', 'done'] as const;
type Status = typeof Statuses[number];

export class CreateTodoDto {
  @ApiProperty({ type: 'string', description: '일정 내용' })
  @IsString()
  content: string;

  @ApiProperty({ type: Date, description: '예약 날짜' })
  @IsISO8601()
  date: string;

  @ApiProperty({ type: String, description: '상태' })
  @IsIn(Statuses)
  status: Status;
}
