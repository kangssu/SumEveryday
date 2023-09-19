import { Injectable } from '@nestjs/common';
import { CreateAcccountBookDto } from './admin.dto';
import { Week } from 'src/enum/accountBook.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountBook } from 'src/entity/accountBook.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AccountBook)
    private readonly accountRepository: Repository<AccountBook>,
  ) {}

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

    const weekResult = () => {
      const firstDay = new Date(now.setDate(1)).getDay();
      const calculationWeek = Math.ceil(
        (Number(createAccountBookDto.date.day) + firstDay) / 7,
      );

      switch (calculationWeek) {
        case 1:
          return Week.THE_FIRST_WEEK;
        case 2:
          return Week.THE_SECOND_WEEK;
        case 3:
          return Week.THE_THIRD_WEEK;
        case 4:
          return Week.THE_FOURTH_WEEK;
        case 5:
          return Week.THE_FIFTH_WEEK;
      }
    };

    const accountBookObject = {
      userId: userId,
      week: weekResult(),
      category: createAccountBookDto.category,
      date: createAccountBookDto.date,
      content: createAccountBookDto.content,
      pay: createAccountBookDto.pay,
    };

    const accountBook = this.accountRepository.save(accountBookObject);
    return accountBook;
  }
}
