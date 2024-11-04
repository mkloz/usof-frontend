import { useInfiniteQuery } from "@tanstack/react-query";
import { infiniteQueryOptions } from "~/queries/infinite/infinite-query-options";
import UserApiService from "~/services/user-api.service";

export function postGroupOptions() {
	return infiniteQueryOptions({
		queryKey: ["users", "me", "posts"],
		queryFn: ({ pageParam }) => UserApiService.getPosts({ page: pageParam }),
	});
}

export function useMyPosts() {
	return useInfiniteQuery(postGroupOptions());
}
