import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SignInDto } from './dto/signin-user.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthorizationGuard } from '../guards/authorization.guard';
import { GetUser } from '../util/getUserId';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({
    summary: '회원 가입',
    description: '새로운 계정을 생성합니다.',
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('/signin')
  @ApiOperation({
    summary: '로그인',
    description: '로그인 및 토큰을 가져옵니다.',
  })
  signIn(@Body() signInDto: SignInDto) {
    return this.userService.signIn(signInDto);
  }

  @Get()
  @ApiBearerAuth('jwt')
  @ApiOperation({
    summary: '회원 정보 조회',
    description: '사용자 정보를 조회합니다.',
  })
  @UseGuards(AuthorizationGuard)
  getUser(@GetUser() user: any) {
    return this.userService.getUser(user.id);
  }
}
