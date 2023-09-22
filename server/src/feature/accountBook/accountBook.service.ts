import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountBook } from 'src/entity/accountBook.entity';
import { Category, Week } from 'src/enum/accountBook.enum';
import { Util } from 'src/util/util';
import { Repository } from 'typeorm';

export interface weeklyAccountBook {
  currentMonth: number;
  firstWeek: AccountBook[];
  secondWeek: AccountBook[];
  thirdWeek: AccountBook[];
  fourthWeek: AccountBook[];
  fifthWeek: AccountBook[];
  monthDetail: {
    incomeTotal: string;
    expenceTotal: string;
    balance: string;
  };
}

@Injectable()
export class AccountBookService {
  constructor(
    @InjectRepository(AccountBook)
    private readonly accountBookRepository: Repository<AccountBook>,
  ) {}

  async getCurrentMonthAccountBooksByUserId(
    userId: string,
  ): Promise<weeklyAccountBook> {
    const month = new Date().getMonth() + 1;

    const accountBooks = await this.accountBookRepository
      .createQueryBuilder('account_book')
      .where({ userId: userId })
      .andWhere("JSON_EXTRACT(date, '$.month') = :month", {
        month,
      })
      .orderBy("JSON_EXTRACT(date, '$.day')")
      .getMany();

    const firstWeek = [];
    const secondWeek = [];
    const thirdWeek = [];
    const fourthWeek = [];
    const fifthWeek = [];

    for (const accountBook of accountBooks) {
      switch (accountBook.week) {
        case Week.THE_FIRST_WEEK:
          firstWeek.push(accountBook);
          break;
        case Week.THE_SECOND_WEEK:
          secondWeek.push(accountBook);
          break;
        case Week.THE_THIRD_WEEK:
          thirdWeek.push(accountBook);
          break;
        case Week.THE_FOURTH_WEEK:
          fourthWeek.push(accountBook);
          break;
        case Week.THE_FIFTH_WEEK:
          fifthWeek.push(accountBook);
          break;
      }
    }

    const incomeTotal = Util.calculateByMonth(
      accountBooks,
      Category.IMPORTATION,
    );

    const expenceTotal = Util.calculateByMonth(accountBooks, Category.EXPENSE);

    const balance = incomeTotal - expenceTotal;

    return {
      currentMonth: month,
      firstWeek: firstWeek,
      secondWeek: secondWeek,
      thirdWeek: thirdWeek,
      fourthWeek: fourthWeek,
      fifthWeek: fifthWeek,
      monthDetail: {
        incomeTotal: Util.setReduce(incomeTotal),
        expenceTotal: Util.setReduce(expenceTotal),
        balance: Util.setReduce(balance),
      },
    };
  }
}
