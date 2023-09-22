import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { AccountBookDate } from 'src/entity/accountBook.entity';
import { Category } from 'src/enum/accountBook.enum';

export class CreateAcccountBookDto {
  @IsEnum(Category)
  category!: Category;

  @IsObject()
  @ValidateNested()
  @Type(() => AccountBookDate)
  date!: AccountBookDate;

  @IsString()
  content!: string;

  @IsString()
  pay!: string;
}

export class SearchAccountBookDto {
  @IsNumber()
  year: number;

  @IsNumber()
  month: number;
}
