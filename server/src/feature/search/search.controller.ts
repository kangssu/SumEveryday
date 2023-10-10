import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
import { UserInfo } from 'src/decorator/userDecorator';
import { User } from 'src/entity/user.entity';
import { FinancialRecordsObject } from '../accountBook/accountBook.service';
import { SearchService } from './search.service';
import { AccountBook } from 'src/entity/accountBook.entity';
import { SearchAccountBookDto } from './search.dto';

@UseGuards(JwtAuthGuard)
@Controller({
  path: '/api',
})
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Post('/accountBook/search')
  searchWeeklyAccountBooksAndTotalByUserIdAndDate(
    @Body() searchAccountBookDto: SearchAccountBookDto,
    @UserInfo() user: User,
  ): Promise<FinancialRecordsObject> {
    return this.searchService.searchWeeklyAccountBooksAndTotalByUserIdAndDate(
      searchAccountBookDto,
      user.id,
    );
  }

  @Post('/accountBook/admin/search')
  searchAccountBooksByUserIdAndDate(
    @Body() searchAccountBookDto: SearchAccountBookDto,
    @UserInfo() user: User,
  ): Promise<AccountBook[]> {
    return this.searchService.searchAccountBooksByUserIdAndDate(
      searchAccountBookDto,
      user.id,
    );
  }
}
