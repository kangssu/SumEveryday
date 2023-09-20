import { AccountBook } from 'src/entity/accountBook.entity';

export class Util {
  static setReduce(total: number) {
    return String(total).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  static calculateByMonth(accountBookList: AccountBook[], category: string) {
    return accountBookList
      .filter((week) => week.category === category)
      .map((week) => Number(week.pay))
      .reduce((total: number, pay: number) => total + pay, 0);
  }
}
