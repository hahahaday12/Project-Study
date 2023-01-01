import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class CreateUserDto {

    @ApiProperty({ type: 'string', description: '아이디' })
    @IsString()
    id: string

    @ApiProperty({ type: 'string', description: '비밀번호' })
    @IsString()
    password: string

    @ApiProperty({ type: 'string', description: '이름' })
    @IsString()
    @IsOptional()
    name: string
}
