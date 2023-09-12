import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountBook } from 'src/entity/accountBook.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AccountBook])],
  providers: [AdminService],
  controllers: [AdminController],
})
export class AdminModule {}
