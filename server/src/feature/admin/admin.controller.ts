import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  Delete,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { AdminService, datesObject } from './admin.service';
import { CreateAcccountBookDto, SearchAccountBookDto } from './admin.dto';
import { AccountBook } from 'src/entity/accountBook.entity';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
import { ApiResult } from 'src/error/apiResult';

@UseGuards(JwtAuthGuard)
@Controller({
  path: '/api',
})
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('/accountBook/create')
  createAccountBook(
    @Body() createAccountBookDto: CreateAcccountBookDto,
    @Req() req: any,
  ): Promise<AccountBook> {
    return this.adminService.createAccountBook(
      createAccountBookDto,
      req.user.id,
    );
  }

  @Get('/accountBook/date')
  getAccountBookDate(@Req() req: any): Promise<datesObject> {
    return this.adminService.getAccountBooksAndDates(req.user.id);
  }

  @Post('/accountBook/search')
  searchAccountBooks(
    @Body() searchAccountBook: SearchAccountBookDto,
    @Req() req: any,
  ): Promise<AccountBook[]> {
    return this.adminService.searchAccountBooks(searchAccountBook, req.user.id);
  }

  @Delete('accountBook/:id')
  async deleteAccountBook(
    @Param('id', ParseIntPipe) id,
  ): Promise<ApiResult<AccountBook>> {
    return {
      success: true,
      data: await this.adminService.deleteAccountBook(id),
    };
  }
}
