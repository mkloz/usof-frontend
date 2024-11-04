import { useInfiniteQuery } from "@tanstack/react-query";
import { infiniteQueryOptions } from "~/queries/infinite/infinite-query-options";
import {
	CategoryApiService,
	GetManyCategories,
} from "~/services/category-api.service";

export function categoryGroupOptions(opt?: GetManyCategories) {
	return infiniteQueryOptions({
		queryKey: ["categories"],
		queryFn: ({ pageParam }) =>
			CategoryApiService.getMany({ ...opt, page: pageParam }),
	});
}

export function useCategories(opt?: GetManyCategories) {
	return useInfiniteQuery(categoryGroupOptions(opt));
}
