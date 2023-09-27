import { Controller, Get, UseGuards } from '@nestjs/common';
import { AccountBookService, weeklyAccountBook } from './accountBook.service';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
import { UserInfo } from 'src/decorator/userDecorator';
import { User } from 'src/entity/user.entity';

@UseGuards(JwtAuthGuard)
@Controller({
  path: '/api',
})
export class AccountBookController {
  constructor(private readonly accountBookService: AccountBookService) {}

  @Get('/accountBook/currentMonth')
  getCurrentMonthAccountBookByUserId(
    @UserInfo() user: User,
  ): Promise<weeklyAccountBook> {
    return this.accountBookService.getCurrentMonthAccountBooksByUserId(user.id);
  }
}
