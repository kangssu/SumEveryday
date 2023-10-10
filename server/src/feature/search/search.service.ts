import { Injectable } from '@nestjs/common';
import { AccountBookLib } from '../accountBook/accountBook.lib';
import { FinancialRecordsObject } from '../accountBook/accountBook.service';
import { AccountBook } from 'src/entity/accountBook.entity';
import { SearchAccountBookDto } from './search.dto';

@Injectable()
export class SearchService {
  constructor(private readonly accountBookLib: AccountBookLib) {}

  async searchWeeklyAccountBooksAndTotalByUserIdAndDate(
    searchAccountBookDto: SearchAccountBookDto,
    userId: string,
  ): Promise<FinancialRecordsObject> {
    const weeklyAccountBooksAndTotal =
      this.accountBookLib.searchWeeklyAccountBooksAndTotalByUserIdAndDate(
        searchAccountBookDto,
        userId,
      );

    return weeklyAccountBooksAndTotal;
  }

  searchAccountBooksByUserIdAndDate(
    searchAccountBookDto: SearchAccountBookDto,
    userId: string,
  ): Promise<AccountBook[]> {
    const searchAccountBooks =
      this.accountBookLib.searchAccountBooksByUserIdAndDate(
        searchAccountBookDto,
        userId,
      );

    return searchAccountBooks;
  }
}
