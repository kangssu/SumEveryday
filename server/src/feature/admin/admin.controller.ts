import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AdminService, datesObject } from './admin.service';
import { CreateAcccountBookDto, SearchAccountBookDto } from './admin.dto';
import { AccountBook } from 'src/entity/accountBook.entity';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';

@UseGuards(JwtAuthGuard)
@Controller({
  path: '/api',
})
export class AdminController {
  constructor(private readonly accountBookService: AdminService) {}

  @Post('/accountBook/create')
  createAccountBook(
    @Body() createAccountBookDto: CreateAcccountBookDto,
    @Req() req: any,
  ): Promise<AccountBook> {
    return this.accountBookService.createAccountBook(
      createAccountBookDto,
      req.user.id,
    );
  }

  @Get('/accountBook/date')
  getAccountBookDate(@Req() req: any): Promise<datesObject> {
    return this.accountBookService.getAccountBooksAndDates(req.user.id);
  }

  @Post('/accountBook/search')
  searchAccountBooks(
    @Body() searchAccountBook: SearchAccountBookDto,
    @Req() req: any,
  ): Promise<AccountBook[]> {
    return this.accountBookService.searchAccountBooks(
      searchAccountBook,
      req.user.id,
    );
  }
}
