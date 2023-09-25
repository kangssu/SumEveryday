import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  Delete,
  Patch,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { AdminService, datesObject } from './admin.service';
import {
  CreateAcccountBookDto,
  SearchAccountBookDto,
  UpdateAccountBookDto,
} from './admin.dto';
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
  getAccountBookDatesByUserId(@Req() req: any): Promise<datesObject> {
    return this.adminService.getAccountBooksAndDatesByUserId(req.user.id);
  }

  @Post('/accountBook/search')
  searchAccountBooksByUserId(
    @Body() searchAccountBook: SearchAccountBookDto,
    @Req() req: any,
  ): Promise<AccountBook[]> {
    return this.adminService.searchAccountBooksByUserId(
      searchAccountBook,
      req.user.id,
    );
  }

  @Patch('/accountBook/:id')
  updateAccountBookById(
    @Param('id', ParseIntPipe) id,
    @Body() updateAccountBook: UpdateAccountBookDto,
  ): Promise<AccountBook> {
    return this.adminService.updateAccountBookById(id, updateAccountBook);
  }

  @Delete('accountBook/:id')
  async deleteAccountBookById(
    @Param('id', ParseIntPipe) id,
  ): Promise<ApiResult<AccountBook>> {
    return {
      success: true,
      data: await this.adminService.deleteAccountBookById(id),
    };
  }
}
