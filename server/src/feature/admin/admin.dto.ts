import { IsEnum, IsObject, IsString } from 'class-validator';
import { AccountBookDate } from 'src/entity/accountBook.entity';
import { Category } from 'src/enum/accountBook.enum';

export class CreateAcccountBookDto {
  @IsEnum(Category)
  category!: Category;

  @IsObject()
  date!: AccountBookDate;

  @IsString()
  content!: string;

  @IsString()
  pay!: string;
}
