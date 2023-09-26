import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AccountBookService, weeklyAccountBook } from './accountBook.service';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';

@UseGuards(JwtAuthGuard)
@Controller({
  path: '/api',
})
export class AccountBookController {
  constructor(private readonly accountBookService: AccountBookService) {}

  @Get('/accountBook/currentMonths')
  getCurrentMonthAccountBookByUserId(
    @Req() req: any,
  ): Promise<weeklyAccountBook> {
    return this.accountBookService.getCurrentMonthAccountBooksByUserId(
      req.user.id,
    );
  }
}
