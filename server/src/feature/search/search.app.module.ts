import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { AccountBookModule } from '../accountBook/accountBook.app.module';

@Module({
  imports: [AccountBookModule],
  providers: [SearchService],
  controllers: [SearchController],
})
export class SearchModule {}
