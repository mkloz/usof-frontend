import { useInfiniteQuery } from "@tanstack/react-query";
import UserApiService from "~/services/user-api.service";
import { infiniteQueryOptions } from "~/queries/infinite/infinite-query-options";

export function userGroupOptions() {
	return infiniteQueryOptions({
		queryKey: ["users"],
		queryFn: ({ pageParam }) => UserApiService.getMany({ page: pageParam }),
	});
}

export function useUsers() {
	return useInfiniteQuery(userGroupOptions());
}
