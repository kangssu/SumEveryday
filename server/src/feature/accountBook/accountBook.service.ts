import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountBook } from 'src/entity/accountBook.entity';
import { Week } from 'src/enum/accountBook.enum';
import { Repository } from 'typeorm';

export interface weeklyAccountBook {
  currentMonth: number;
  firstWeek: AccountBook[];
  secondWeek: AccountBook[];
  thirdWeek: AccountBook[];
  fourthWeek: AccountBook[];
  fifthWeek: AccountBook[];
}

@Injectable()
export class AccountBookService {
  constructor(
    @InjectRepository(AccountBook)
    private readonly accountBookRepository: Repository<AccountBook>,
  ) {}

  async getCurrentMonthAccountBookByUserId(
    userId: string,
  ): Promise<weeklyAccountBook> {
    const month = new Date().getMonth() + 1;

    const accountBookList = await this.accountBookRepository
      .createQueryBuilder('account_book')
      .where({ userId: userId })
      .andWhere("JSON_UNQUOTE(JSON_EXTRACT(date, '$.month')) = :month", {
        month,
      })
      .getMany();

    const firstWeek = [];
    const secondWeek = [];
    const thirdWeek = [];
    const fourthWeek = [];
    const fifthWeek = [];

    for (const accountBookObject of accountBookList) {
      switch (accountBookObject.week) {
        case Week.THE_FIRST_WEEK:
          firstWeek.push(accountBookObject);
          break;
        case Week.THE_SECOND_WEEK:
          secondWeek.push(accountBookObject);
          break;
        case Week.THE_THIRD_WEEK:
          thirdWeek.push(accountBookObject);
          break;
        case Week.THE_FOURTH_WEEK:
          fourthWeek.push(accountBookObject);
          break;
        case Week.THE_FIFTH_WEEK:
          fifthWeek.push(accountBookObject);
          break;
      }
    }

    return {
      currentMonth: month,
      firstWeek: firstWeek,
      secondWeek: secondWeek,
      thirdWeek: thirdWeek,
      fourthWeek: fourthWeek,
      fifthWeek: fifthWeek,
    };
  }
}
