import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  AccountBookService,
  FinancialRecordsObject,
} from './accountBook.service';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
import { UserInfo } from 'src/decorator/userDecorator';
import { User } from 'src/entity/user.entity';

@UseGuards(JwtAuthGuard)
@Controller({
  path: '/api',
})
export class AccountBookController {
  constructor(private readonly accountBookService: AccountBookService) {}

  @Get('/accountBooks/currentMonth')
  getCurrentMonthWeeklyAccountBooksAndTotalByUserId(
    @UserInfo() user: User,
  ): Promise<FinancialRecordsObject> {
    return this.accountBookService.getCurrentMonthWeeklyAccountBooksAndTotalByUserId(
      user.id,
    );
  }
}
