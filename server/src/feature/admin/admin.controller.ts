import {
  Body,
  Controller,
  Get,
  Post,
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
import { UserInfo } from 'src/decorator/userDecorator';
import { User } from 'src/entity/user.entity';

@UseGuards(JwtAuthGuard)
@Controller({
  path: '/api',
})
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('/accountBook/create')
  async createAccountBook(
    @Body() createAccountBookDto: CreateAcccountBookDto,
    @UserInfo() user: User,
  ): Promise<ApiResult<AccountBook>> {
    return {
      success: true,
      data: await this.adminService.createAccountBook(
        createAccountBookDto,
        user.id,
      ),
    };
  }

  @Get('/accountBook/date')
  getAccountBooksAndDatesByUserId(
    @UserInfo() user: User,
  ): Promise<datesObject> {
    return this.adminService.getAccountBooksAndDatesByUserId(user.id);
  }

  @Post('/accountBook/search')
  searchAccountBooksByDateAndUserId(
    @Body() searchAccountBookDto: SearchAccountBookDto,
    @UserInfo() user: User,
  ): Promise<AccountBook[]> {
    return this.adminService.searchAccountBooksByDateAndUserId(
      searchAccountBookDto,
      user.id,
    );
  }

  @Patch('/accountBook/:id')
  updateAccountBookById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAccountBook: UpdateAccountBookDto,
  ): Promise<AccountBook> {
    return this.adminService.updateAccountBookById(id, updateAccountBook);
  }

  @Delete('/accountBook/:id')
  async deleteAccountBookById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ApiResult<AccountBook>> {
    return {
      success: true,
      data: await this.adminService.deleteAccountBookById(id),
    };
  }
}
