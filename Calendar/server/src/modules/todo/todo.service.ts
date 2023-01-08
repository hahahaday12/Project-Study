import {
  BadRequestException,
  Inject,
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';
import { GlobalService } from '../global/global.service';
import { TodoSchema } from 'schema/schema.md';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import mongoose from 'mongoose';
@Injectable()
export class TodoService {
  constructor(
    private readonly GlobalService: GlobalService,
    @Inject('DBConnections')
    private readonly connections: Map<string, Promise<mongoose.Connection>>,
  ) {}

  async createTodo(createTodoDto: CreateTodoDto, user: any) {
    const connection = await this.connections.get('gateway');
    const TodoModel = connection.model('todo', TodoSchema);

    console.log(createTodoDto);
    const queryResult = await TodoModel.create({
      ...createTodoDto,
      //date: this.GlobalService.ChangeDate(createTodoDto.date),
      user_id: user.id,
    });

    if (queryResult) {
      return { message: 'successful', data: queryResult };
    } else {
      throw new ServiceUnavailableException({
        message: 'ServiceUnavailableException',
        errorMessage: '데이터베이스 연결 및 기타 서버 오류입니다.',
      });
    }
  }

  async getTodo(id?: string, year?: string, month?: string, day?: string) {
    const connection = await this.connections.get('gateway');
    const TodoModel = connection.model('todo', TodoSchema);

    if (!year && !month && !day) return {};
    const dateTimes = year + '-' + month + '-' + day;
    //year/month/day

    const setTimestampFilter = (year: string, month: string, day: string) => {
      if (!year && !month && !day) return {};
      const timestampRange = this.GlobalService.generateTimestampRange(
        year,
        month,
        day,
        'year/month/day',
      );
      return {
        date: {
          $gte: timestampRange.startDate,
          $lte: timestampRange.endDate,
        },
      };
    };

    const todo = await TodoModel.find({
      $and: [{ user_id: id }, setTimestampFilter(year, month, day)],
      //{ date: { $eq: new Date(dateTimes) } },
      //],
      //[{date: new Date(dateInfo)}],
    })
      .limit(10)
      .select(['-createdAt', '-updatedAt'])
      .lean();

    if (todo) {
      return { message: 'successful', data: todo };
    } else {
      throw new ServiceUnavailableException({
        message: 'ServiceUnavailableException',
        errorMessage: '데이터베이스 연결 및 기타 서버 오류입니다.',
      });
    }
  }

  async deleteTodo(id: string) {
    const connection = await this.connections.get('gateway');
    const TodoModel = connection.model('todo', TodoSchema);

    const result = await TodoModel.deleteOne({ _id: id });

    if (result.deletedCount) {
      return { message: 'successful' };
    } else {
      throw new BadRequestException({
        message: 'BadRequestException',
        errorMessage: '존재하지 않는 할일입니다.',
      });
    }
  }

  async updateTodo(id: string, updateTodoDto: UpdateTodoDto) {
    const connection = await this.connections.get('gateway');
    const TodoModel = connection.model('todo', TodoSchema);

    const result = await TodoModel.updateOne(
      { _id: id },
      { $set: updateTodoDto },
    );

    if (result.matchedCount) {
      return { message: 'successful' };
    } else {
      throw new BadRequestException({
        message: 'BadRequestException',
        errorMessage: '존재하지 않는 할일입니다.',
      });
    }
  }
}
