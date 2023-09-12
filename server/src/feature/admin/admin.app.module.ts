import { Module } from '@nestjs/common';
import { AccountBookService } from './admin.service';
import { AccountBookController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountBook } from 'src/entity/accountBook.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AccountBook])],
  providers: [AccountBookService],
  controllers: [AccountBookController],
})
export class AccountBookModule {}
