import { Injectable } from '@nestjs/common';
import { CreateAcccountBookDto, UpdateAccountBookDto } from './admin.dto';
import { AccountBook } from 'src/entity/accountBook.entity';
import { AccountBookService } from '../accountBook/accountBook.service';

export interface AllAcountBookObject {
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

  getAllAccountBooksAndDatesByUserId(
    userId: string,
  ): Promise<AllAcountBookObject> {
    return this.accountBookService.getAllAccountBooksAndDatesByUserId(userId);
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

  deleteAccountBookById(id: number): Promise<AccountBook> {
    return this.accountBookService.deleteAccountBookById(id);
  }
}
