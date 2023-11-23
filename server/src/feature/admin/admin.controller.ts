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
  HttpException,
} from '@nestjs/common';
import { AdminService, AllAcountBookObject } from './admin.service';
import { CreateAcccountBookDto, UpdateAccountBookDto } from './admin.dto';
import { AccountBook } from 'src/entity/accountBook.entity';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
import { ApiResult } from 'src/error/apiResult';
import { UserInfo } from 'src/decorator/userDecorator';
import { User } from 'src/entity/user.entity';
import { ErrorMessage } from 'src/enum/errorMessage.enum';
import { ErrorCode } from 'src/enum/errorCode.enum';

@UseGuards(JwtAuthGuard)
@Controller({
  path: '/api/accountBooks',
})
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
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

  @Get()
  getAllAccountBookAndDatesByUserId(
    @UserInfo() user: User,
  ): Promise<AllAcountBookObject> {
    return this.adminService.getAllAccountBooksAndDatesByUserId(user.id);
  }

  @Patch('/:id')
  async updateAccountBookById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAccountBook: UpdateAccountBookDto,
  ): Promise<AccountBook> {
    const accountBook =
      await this.adminService.getAccountBookByAccountBookId(id);

    if (!accountBook) {
      throw new HttpException(
        ErrorMessage.NOT_FOUND_ACCOUNT_BOOK,
        ErrorCode.NOT_FOUNT,
      );
    }
    return await this.adminService.updateAccountBookById(id, updateAccountBook);
  }

  @Delete('/:id')
  async deleteAccountBookById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ApiResult<AccountBook>> {
    const accountBook =
      await this.adminService.getAccountBookByAccountBookId(id);

    if (!accountBook) {
      throw new HttpException(
        ErrorMessage.NOT_FOUND_ACCOUNT_BOOK,
        ErrorCode.NOT_FOUNT,
      );
    }

    return {
      success: true,
      data: await this.adminService.deleteAccountBookById(id),
    };
  }
}
