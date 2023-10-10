import { IsNumber } from 'class-validator';

export class SearchAccountBookDto {
  @IsNumber()
  year: number;

  @IsNumber()
  month: number;
}
