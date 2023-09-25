import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountBook } from 'src/entity/accountBook.entity';
import { Category, Week } from 'src/enum/accountBook.enum';
import { Util } from 'src/util/util';
import { Repository } from 'typeorm';
import {
  CreateAcccountBookDto,
  SearchAccountBookDto,
  UpdateAccountBookDto,
} from '../admin/admin.dto';
import { datesObject } from '../admin/admin.service';

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

  createAccountBook(
    createAccountBookDto: CreateAcccountBookDto,
    userId: string,
  ): Promise<AccountBook> {
    const now = new Date();
    createAccountBookDto.date.year = now.getFullYear();

    const originPay = createAccountBookDto.pay;
    createAccountBookDto.pay = originPay.replace(
      /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ]/gim,
      '',
    );

    const weekResult = Util.CalculateWeek(
      now.getFullYear(),
      createAccountBookDto.date.month - 1,
      createAccountBookDto.date.day,
    );

    const accountBookObject = {
      userId: userId,
      week: weekResult,
      category: createAccountBookDto.category,
      date: createAccountBookDto.date,
      content: createAccountBookDto.content,
      pay: createAccountBookDto.pay,
    };

    const accountBook = this.accountBookRepository.save(accountBookObject);
    return accountBook;
  }

  async getAccountBooksAndDatesByUserId(userId: string): Promise<datesObject> {
    const accountBooks = await this.accountBookRepository
      .createQueryBuilder('account_book')
      .where({ userId: userId })
      .orderBy(
        "JSON_EXTRACT(date, '$.year') DESC, JSON_EXTRACT(date, '$.month') DESC, JSON_EXTRACT(date, '$.day')",
        'DESC',
      )
      .getMany();

    const years = accountBooks.map((date) => date.date.year);
    const removeAndSortYearDuplicates = Util.removeAndSortDateDuplicates(years);

    const months = accountBooks.map((date) => date.date.month);
    const removeAndSortMonthDuplicates =
      Util.removeAndSortDateDuplicates(months);

    return {
      years: removeAndSortYearDuplicates,
      months: removeAndSortMonthDuplicates,
      accountBooks: accountBooks,
    };
  }

  async updateAccountBookById(
    id: number,
    updateAccountBookDto: UpdateAccountBookDto,
  ): Promise<AccountBook> {
    const now = new Date();
    const accountBook = await this.accountBookRepository.findOne({
      where: { no: id },
    });

    if (updateAccountBookDto.date.month) {
      accountBook.date.month = updateAccountBookDto.date.month;

      accountBook.week = Util.CalculateWeek(
        now.getFullYear(),
        updateAccountBookDto.date.month - 1,
        accountBook.date.day,
      );
    }
    if (updateAccountBookDto.date.day) {
      accountBook.date.day = updateAccountBookDto.date.day;

      accountBook.week = Util.CalculateWeek(
        now.getFullYear(),
        accountBook.date.month - 1,
        updateAccountBookDto.date.day,
      );
    }
    if (updateAccountBookDto.category) {
      accountBook.category = updateAccountBookDto.category;
    }
    if (updateAccountBookDto.pay) {
      accountBook.pay = updateAccountBookDto.pay;
    }
    if (updateAccountBookDto.content) {
      accountBook.content = updateAccountBookDto.content;
    }

    const updateAccountBook =
      await this.accountBookRepository.save(accountBook);
    return updateAccountBook;
  }

  searchAccountBooksByUserId(
    searchAccountBook: SearchAccountBookDto,
    userId: string,
  ): Promise<AccountBook[]> {
    const searchAccountBooks = this.accountBookRepository
      .createQueryBuilder('account_book')
      .where("JSON_EXTRACT(date, '$.year') = :year", {
        year: searchAccountBook.year,
      })
      .andWhere("JSON_EXTRACT(date, '$.month') = :month", {
        month: searchAccountBook.month,
      })
      .andWhere({ userId: userId })
      .getMany();

    return searchAccountBooks;
  }

  deleteAccountBookById(id: number): Promise<AccountBook> {
    return this.accountBookRepository.softRemove({ no: id });
  }
}
