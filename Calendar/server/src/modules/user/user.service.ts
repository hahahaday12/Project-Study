import { BadRequestException, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import mongoose from 'mongoose';
import { UserDocument, UserSchema } from 'schema/schema.md';
import { GlobalService } from '../global/global.service';
import { JWTService } from '../global/jwt.service';
import { CreateUserDto } from './dto/create-user.dto';
import { SignInDto } from './dto/signin-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as crypto from 'crypto'

@Injectable()
export class UserService {
  constructor(
    private readonly JWTService: JWTService,
    private readonly GlobalService: GlobalService,
    @Inject('DBConnections') private readonly connections: Map<string, Promise<mongoose.Connection>>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const connection = await this.connections.get('gateway')
    const userModel = connection.model('user', UserSchema)

    const userDocument: UserDocument = {
      id: createUserDto.id,
      password: this.GlobalService.pbkdf2Hash(createUserDto.password),
      name: createUserDto.name
    }

    const result = await userModel.create(userDocument).catch(error => {
      if(error.code === 11000){
        throw new BadRequestException({ message: '중복된 아이디입니다.', errorMessage: `중복된 인덱스 ${error.index}번` })
      } else {
        throw new InternalServerErrorException({ message: '알 수 없는 서버 오류' })
      }
    })

    return result;
  }

  async signIn(signInDto: SignInDto) {
    const password = this.GlobalService.pbkdf2Hash(signInDto.password)

    const connection = await this.connections.get('gateway')
    const userModel = connection.model('user', UserSchema)

    const user = await userModel.findOne({
      id: signInDto.id,
      password
    }, ['id']).lean()
    console.log(user)

    if(user) {
      const token = await this.JWTService.generate(user, 'server1')
      return { message: 'successful', token: token }
    } else {
      throw new BadRequestException({ message: 'bad request', errorMessage: `잘못된 로그인 정보입니다.` })
    }
  }

  async getUser(id) {
    const connection = await this.connections.get('gateway')
    const userModel = connection.model('user', UserSchema)

    const user = await userModel.findOne({ id: id }, ['id', 'name', 'createdAt']).lean()

    if(!user) {
      throw new NotFoundException({ message: 'NotFoundException', errorMessage: '유저 정보가 없습니다.' })
    }

    return { message: 'successful', data: { user: user } }
  }
}
