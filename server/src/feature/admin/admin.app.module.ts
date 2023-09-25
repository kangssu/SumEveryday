import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountBook } from 'src/entity/accountBook.entity';
import { AccountBookModule } from '../accountBook/accountBook.app.module';

@Module({
  imports: [TypeOrmModule.forFeature([AccountBook]), AccountBookModule],
  providers: [AdminService],
  controllers: [AdminController],
})
export class AdminModule {}
