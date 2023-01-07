import {
  BadRequestException,
  Inject,
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';
import mongoose from 'mongoose';
import { CreateDiaryDto } from './dto/create-diary.dto';
import { DiarySchema } from 'schema/schema.md';
import { UpdateDiaryDto } from './dto/update-diary.dto';
import { GlobalService } from '../global/global.service';

@Injectable()
export class DiaryService {
  constructor(
    private readonly GlobalService: GlobalService,
    @Inject('DBConnections')
    private readonly connections: Map<string, Promise<mongoose.Connection>>,
  ) {}

  async createDiary(createDiaryDto: CreateDiaryDto, user: any) {
    const connection = await this.connections.get('gateway');
    const DiaryModel = connection.model('diary', DiarySchema);

    const queryResult = await DiaryModel.create({
      ...createDiaryDto,
      date: this.GlobalService.ChangeDate(createDiaryDto.date),
      user_id: user.id,
    }
    );

    if (queryResult) {
      return { message: 'successful', data: queryResult };
    } else {
      throw new ServiceUnavailableException({
        message: 'ServiceUnavailableException',
        errorMessage: '데이터베이스 연결 및 기타 서버 오류입니다.',
      });
    }
  }

  async getDiary(user: any, year?: string, month?: string) {
    const day = null;

    const connection = await this.connections.get('gateway');
    const DiaryModel = connection.model('diary', DiarySchema);

    const setTimestampFilter = (year: string, month: string, day: string) => {
      if (!year && !month) return {};
      console.log('1111111');
      const timestampRange = this.GlobalService.generateTimestampRange(
        year,
        month,
        day,
        'year/month',
      );
      return {
        date: {
          $gte: timestampRange.startDate,
          $lte: timestampRange.endDate,
        },
      };
    };

    const diary = await DiaryModel.find({
      $and: [{ user_id: user.id }, setTimestampFilter(year, month, day)],
    })
      .select(['-createdAt', '-updatedAt'])
      .lean();

    if (diary) {
      return { message: 'successful', data: diary };
    } else {
      throw new ServiceUnavailableException({
        message: 'ServiceUnavailableException',
        errorMessage: '데이터베이스 연결 및 기타 서버 오류입니다.',
      });
    }
  }

  async deleteDiary(id: string) {
    const connection = await this.connections.get('gateway');
    const DiaryModel = connection.model('diary', DiarySchema);

    const result = await DiaryModel.deleteOne({ _id: id });

    if (result.deletedCount) {
      return { message: 'successful' };
    } else {
      throw new BadRequestException({
        message: 'BadRequestException',
        errorMessage: '존재하지 않는 다이어리입니다.',
      });
    }
  }

  async updateDiary(id: string, updateDiaryDto: UpdateDiaryDto) {
    const connection = await this.connections.get('gateway');
    const DiaryModel = connection.model('diary', DiarySchema);

    const result = await DiaryModel.updateOne(
      { _id: id },
      { $set: updateDiaryDto },
    );

    if (result.matchedCount) {
      return { message: 'successful' };
    } else {
      throw new BadRequestException({
        message: 'BadRequestException',
        errorMessage: '존재하지 않는 다이어리입니다.',
      });
    }
  }
}
