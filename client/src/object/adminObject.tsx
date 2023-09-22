import { AccountBookObject } from "./accountBookObject";

export interface dateListObject {
	years: number[];
	months: number[];
	accountBooks: AccountBookObject[];
}

export interface dateObject {
	year: number;
	month: number;
}
