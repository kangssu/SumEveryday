import { AccountBookObject } from "./accountBookObject";

export interface AllAcountBookObject {
	years: number[];
	months: number[];
	accountBooks: AccountBookObject[];
}

export interface dateObject {
	year: number;
	month: number;
}
