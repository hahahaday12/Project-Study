import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';
import moment from 'moment-timezone';

@Injectable()
export class GlobalService {
  constructor(private readonly configService: ConfigService) {}

  public pbkdf2Hash(password: string) {
    const salt = this.configService.get('SALT');

    const hash = crypto.pbkdf2Sync(password, salt, 20000, 256, 'sha512');

    return hash.toString('hex');
  }

  public generateTimestampRange(
    year: string,
    month: string,
    day: string,
    status: string,
  ) {
    if (!year) {
      throw new BadRequestException({
        message: 'BadRequestException',
        errorMessage: 'year 값이 입력되지 않았습니다.',
      });
    }

    if (!month) {
      month = '12';
    }
    let lastDay = new Date(parseInt(year), parseInt(month), 0);

    let startDate: Date, endDate: Date;

    if (status == 'year/month/day') {
      console.log('year/month/day');
      startDate = new Date(
        Date.UTC(parseInt(year), parseInt(month) - 1, parseInt(day), -9, 0, 0),
      );

      endDate = new Date(
        Date.UTC(
          parseInt(year),
          parseInt(month) - 1,
          parseInt(day),
          14,
          59,
          59,
        ),
      );
    }

    if (status == 'year/month') {
      //console.log('year/month');
      startDate = new Date(
        Date.UTC(parseInt(year), parseInt(month) - 1, 1, -18, 0, 0),
      );
      endDate = new Date(
        Date.UTC(
          parseInt(year),
          parseInt(month) - 1,
          lastDay.getDate(),
          5,
          59,
          59,
        ),
      );
    }

    if (status == 'year') {
      //console.log('year/');
      startDate = new Date(
        Date.UTC(parseInt(year), parseInt(month), 0, -18, 0, 0, 0),
      );
      endDate = new Date(
        Date.UTC(parseInt(year), 11, lastDay.getDate(), 5, 59, 59),
      );
    }

    startDate = this.ChangeDate(startDate.toISOString());
    endDate = this.ChangeDate(endDate.toISOString());

    console.log('startDate' + startDate);
    console.log('endDate)' + endDate);
    return { startDate, endDate };
  }

  public ChangeDate(utc: string) {
    console.log(new Date(new Date(utc).getTime() + 3600000 * 9));
    return new Date(new Date(utc).getTime() + 3600000 * 9);
  }
}
