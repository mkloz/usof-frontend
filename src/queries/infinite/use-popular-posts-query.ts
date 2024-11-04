import { useInfiniteQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { PostApiService } from "~/services/post-api.service";
import { infiniteQueryOptions } from "~/queries/infinite/infinite-query-options";
import { SortOrder } from "~/types/common";

export function postGroupOptions() {
	return infiniteQueryOptions({
		queryKey: ["posts", "popular"],
		queryFn: ({ pageParam }) =>
			PostApiService.getMany({
				page: pageParam,
				fromDate: dayjs().subtract(1, "week").toString(),
				sortByLikes: SortOrder.DESC,
			}),
	});
}

export function usePopularPosts() {
	return useInfiniteQuery(postGroupOptions());
}
