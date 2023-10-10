import { Injectable } from '@nestjs/common';

import {
  AccountBookService,
  FinancialRecordsObject,
} from './accountBook.service';
import { AccountBook } from 'src/entity/accountBook.entity';
import { SearchAccountBookDto } from '../search/search.dto';

@Injectable()
export class AccountBookLib {
  constructor(private readonly accountBookService: AccountBookService) {}

  async searchWeeklyAccountBooksAndTotalByUserIdAndDate(
    searchAccountBookDto: SearchAccountBookDto,
    userId: string,
  ): Promise<FinancialRecordsObject> {
    return this.accountBookService.searchWeeklyAccountBooksAndTotalByUserIdAndDate(
      searchAccountBookDto,
      userId,
    );
  }

  searchAccountBooksByUserIdAndDate(
    searchAccountBookDto: SearchAccountBookDto,
    userId: string,
  ): Promise<AccountBook[]> {
    return this.accountBookService.searchAccountBooksByUserIdAndDate(
      searchAccountBookDto,
      userId,
    );
  }
}
