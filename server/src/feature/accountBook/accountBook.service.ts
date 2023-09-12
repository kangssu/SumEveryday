import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountBook } from 'src/entity/accountBook.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AccountBookService {
  constructor(
    @InjectRepository(AccountBook)
    private readonly accountBookRepository: Repository<AccountBook>,
  ) {}

  getCurrentMonthAccountBookByUserId(userId: string) {
    const month = new Date().getMonth() + 1;

    return this.accountBookRepository
      .createQueryBuilder('account_book')
      .where({ userId: userId })
      .andWhere("JSON_UNQUOTE(JSON_EXTRACT(date, '$.month')) = :month", {
        month,
      })
      .getMany();
  }
}
