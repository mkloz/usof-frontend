import { z } from "zod";

export enum SortOrder {
	ASC = "asc",
	DESC = "desc",
}

export interface PaginationOptions {
	page?: number;
	limit?: number;
}
export type Optional<T, K extends PropertyKey = PropertyKey> = Partial<
	Pick<T, Extract<keyof T, K>>
> &
	Omit<T, K> extends infer O
	? { [P in keyof O]: O[P] }
	: never;

export const FormOptional = z.unknown().transform((value) => {
	return !value || value === "undefined" ? undefined : value;
});

export type Expand<T> = T extends (...args: infer A) => infer R
	? (...args: Expand<A>) => Expand<R>
	: T extends infer O
	? { [K in keyof O]: O[K] }
	: never;

export type ExpandRecursively<T> = T extends (...args: infer A) => infer R
	? (...args: ExpandRecursively<A>) => ExpandRecursively<R>
	: T extends object
	? T extends infer O
		? { [K in keyof O]: ExpandRecursively<O[K]> }
		: never
	: T;
