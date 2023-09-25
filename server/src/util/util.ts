import { AccountBook } from 'src/entity/accountBook.entity';
import { Week } from 'src/enum/accountBook.enum';

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
  static CalculateWeek(year: number, month: number, day: number) {
    const resetDate = new Date(year, month, 1);
    const firstDay = resetDate.getDay();
    const calculationWeek = Math.ceil((Number(day) + firstDay) / 7);

    switch (calculationWeek) {
      case 1:
        return Week.THE_FIRST_WEEK;
      case 2:
        return Week.THE_SECOND_WEEK;
      case 3:
        return Week.THE_THIRD_WEEK;
      case 4:
        return Week.THE_FOURTH_WEEK;
      case 5:
        return Week.THE_FIFTH_WEEK;
    }
  }
}
