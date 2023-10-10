import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { AccountBookModule } from '../accountBook/accountBook.app.module';

@Module({
  imports: [AccountBookModule],
  providers: [AdminService],
  controllers: [AdminController],
})
export class AdminModule {}
