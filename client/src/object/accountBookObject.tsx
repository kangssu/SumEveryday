import { Category, Week } from "../enum/accountBook.enum";

export interface WeeklyIncomeTotalObject {
	firstWeek?: string;
	secondWeek?: string;
	thirdWeek?: string;
	fourthWeek?: string;
	fifthWeek?: string;
}

export interface WeeklyExpenseTotalObject {
	firstWeek?: string;
	secondWeek?: string;
	thirdWeek?: string;
	fourthWeek?: string;
	fifthWeek?: string;
}

export interface AccountBookDate {
	year: number;
	month: number;
	day: number;
}

export interface AccountBookObject {
	no: number;
	userId: string;
	week: Week;
	category: Category;
	date: AccountBookDate;
	content: string;
	pay: string;
	createdAt: Date;
	deletedAt: Date;
}

export interface WeeklyAccountBookObject {
	currentMonth: number;
	firstWeek: AccountBookObject[];
	secondWeek: AccountBookObject[];
	thirdWeek: AccountBookObject[];
	fourthWeek: AccountBookObject[];
	fifthWeek: AccountBookObject[];
	monthDetail: {
		incomeTotal: string;
		expenceTotal: string;
		balance: string;
	  }
  }