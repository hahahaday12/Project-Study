import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

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
    let startDate: Date, endDate: Date;
    if (status == 'year/month/day') {
      console.log('year/month/day');
      startDate = new Date(
        Date.UTC(parseInt(year), parseInt(month) - 1, parseInt(day), 0, 0, 0),
      );

      endDate = new Date(
        Date.UTC(
          parseInt(year),
          parseInt(month) - 1,
          parseInt(day) - 2,
          59,
          59,
          59,
        ),
      );
    }

    if (status == 'year/month') {
      //console.log('year/month');
      startDate = new Date(Date.UTC(parseInt(year), parseInt(month) - 1, 1));
      endDate = new Date(Date.UTC(parseInt(year), parseInt(month), 0));
    }

    if (status == 'year') {
      //console.log('year/');
      startDate = new Date(Date.UTC(parseInt(year), 0, 1));
      endDate = new Date(Date.UTC(parseInt(year), 12, 0));
    }

    startDate = this.ChangeDate(startDate.toISOString());
    endDate = this.ChangeDate(endDate.toISOString());
    console.log(startDate);
    console.log(endDate);

    return { startDate, endDate };
  }

  public ChangeDate(utc: string) {
    console.log('start');
    console.log(utc);
    console.log(new Date(new Date(utc).getTime() + 540 * 60 * 1000));
    console.log('end');

    return new Date(new Date(utc).getTime() + 540 * 60 * 1000);
  }
}
