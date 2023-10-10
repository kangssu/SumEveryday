import { Module } from '@nestjs/common';
import { AccountBookController } from './accountBook.controller';
import { AccountBookService } from './accountBook.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountBook } from 'src/entity/accountBook.entity';
import { AccountBookLib } from './accountBook.lib';

@Module({
  imports: [TypeOrmModule.forFeature([AccountBook])],
  providers: [AccountBookService, AccountBookLib],
  controllers: [AccountBookController],
  exports: [AccountBookService, AccountBookLib],
})
export class AccountBookModule {}
