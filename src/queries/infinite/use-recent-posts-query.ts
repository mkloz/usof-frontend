import { useInfiniteQuery } from "@tanstack/react-query";
import { PostApiService } from "~/services/post-api.service";
import { infiniteQueryOptions } from "~/queries/infinite/infinite-query-options";
import { SortOrder } from "~/types/common";

export function postGroupOptions() {
	return infiniteQueryOptions({
		queryKey: ["posts", "recent"],
		queryFn: ({ pageParam = 1 }) =>
			PostApiService.getMany({
				page: pageParam,
				sortByDate: SortOrder.DESC,
			}),
	});
}

export function useRecentPosts() {
	return useInfiniteQuery(postGroupOptions());
}
