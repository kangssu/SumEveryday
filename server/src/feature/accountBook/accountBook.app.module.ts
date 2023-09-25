import { Module } from '@nestjs/common';
import { AccountBookController } from './accountBook.controller';
import { AccountBookService } from './accountBook.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountBook } from 'src/entity/accountBook.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AccountBook])],
  providers: [AccountBookService],
  controllers: [AccountBookController],
  exports: [AccountBookService],
})
export class AccountBookModule {}
