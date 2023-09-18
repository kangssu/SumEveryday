import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AccountBookService, weeklyAccountBook } from './accountBook.service';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';

@Controller({
  path: '/api',
})
export class AccountBookController {
  constructor(private readonly accountBookService: AccountBookService) {}

  @Get('/accountBook/currentMonthList')
  @UseGuards(JwtAuthGuard)
  getCurrentMonthAccountBookByUserId(
    @Req() req: any,
  ): Promise<weeklyAccountBook> {
    return this.accountBookService.getCurrentMonthAccountBookByUserId(
      req.user.id,
    );
  }
}
