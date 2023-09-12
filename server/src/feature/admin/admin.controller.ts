import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAcccountBookDto } from './admin.dto';
import { AccountBook } from 'src/entity/accountBook.entity';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';

@Controller({
  path: '/api',
})
export class AdminController {
  constructor(private readonly accountBookService: AdminService) {}

  @Post('/accountBook/create')
  @UseGuards(JwtAuthGuard)
  createAccountBook(
    @Body() createAccountBookDto: CreateAcccountBookDto,
    @Req() req: any,
  ): Promise<AccountBook> {
    return this.accountBookService.createAccountBook(
      createAccountBookDto,
      req.user.id,
    );
  }
}
