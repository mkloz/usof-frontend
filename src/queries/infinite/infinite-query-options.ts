import {
	InfiniteData,
	infiniteQueryOptions as options,
	QueryKey,
	UnusedSkipTokenInfiniteOptions,
} from "@tanstack/react-query";
import { Optional } from "~/types/common";
import { IPaginationResponse } from "~/types/pagination-response";

interface InfiniteQueryOptionsParams<T>
	extends Optional<
		UnusedSkipTokenInfiniteOptions<
			IPaginationResponse<T>,
			Error,
			InfiniteData<IPaginationResponse<T>, number>,
			QueryKey,
			number
		>,
		| "getNextPageParam"
		| "initialPageParam"
		| "maxPages"
		| "getPreviousPageParam"
	> {}

export function infiniteQueryOptions<T>(params: InfiniteQueryOptionsParams<T>) {
	return options({
		getNextPageParam: (lastLoaded) =>
			lastLoaded.links.next ? lastLoaded.meta.currentPage + 1 : undefined,
		initialPageParam: 1,
		maxPages: 10,
		getPreviousPageParam: (firstLoaded) =>
			firstLoaded.links.previous ? firstLoaded.meta.currentPage - 1 : undefined,
		...params,
	});
}
