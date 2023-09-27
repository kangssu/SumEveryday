import { Injectable } from '@nestjs/common';
import {
  CreateAcccountBookDto,
  SearchAccountBookDto,
  UpdateAccountBookDto,
} from './admin.dto';
import { AccountBook } from 'src/entity/accountBook.entity';
import { AccountBookService } from '../accountBook/accountBook.service';

export interface datesObject {
  years: number[];
  months: number[];
  accountBooks: AccountBook[];
}

@Injectable()
export class AdminService {
  constructor(private readonly accountBookService: AccountBookService) {}

  createAccountBook(
    createAccountBookDto: CreateAcccountBookDto,
    userId: string,
  ): Promise<AccountBook> {
    return this.accountBookService.createAccountBook(
      createAccountBookDto,
      userId,
    );
  }

  getAccountBooksAndDatesByUserId(userId: string): Promise<datesObject> {
    return this.accountBookService.getAccountBooksAndDatesByUserId(userId);
  }

  async updateAccountBookById(
    id: number,
    updateAccountBookDto: UpdateAccountBookDto,
  ): Promise<AccountBook> {
    return this.accountBookService.updateAccountBookById(
      id,
      updateAccountBookDto,
    );
  }

  searchAccountBooksByDateAndUserId(
    searchAccountBook: SearchAccountBookDto,
    userId: string,
  ): Promise<AccountBook[]> {
    return this.accountBookService.searchAccountBooksByDateAndUserId(
      searchAccountBook,
      userId,
    );
  }

  deleteAccountBookById(id: number): Promise<AccountBook> {
    return this.accountBookService.deleteAccountBookById(id);
  }
}
