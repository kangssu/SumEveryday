import { AccountBook } from 'src/entity/accountBook.entity';

export class Util {
  static setReduce(total: number) {
    return String(total).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  static calculateByMonth(accountBooks: AccountBook[], category: string) {
    return accountBooks
      .filter((week) => week.category === category)
      .map((week) => Number(week.pay))
      .reduce((total: number, pay: number) => total + pay, 0);
  }

  static removeAndSortDateDuplicates(list: number[]) {
    const dateDeduplication = list.filter((e, i) => list.indexOf(e) === i);
    const dateSort = dateDeduplication.sort((a: number, b: number) => {
      return b - a;
    });
    return dateSort;
  }
}
