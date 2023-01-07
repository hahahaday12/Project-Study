import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsISO8601, IsOptional, IsString } from "class-validator";

export class CreateDiaryDto {
    @ApiProperty({ type: 'string', description: '다이어리 제목' })
    @IsString()
    title: string;

    @ApiProperty({ type: 'string', description: '다이어리 내용' })
    @IsString()
    content: string;

    @ApiProperty({ type: Date, description: '날짜' })
    @IsISO8601()
    date: string;

    @ApiProperty({ type: 'string', description: '색상' })
    @IsString()
    color: string;
}
