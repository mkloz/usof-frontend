import { queryOptions, useQuery } from "@tanstack/react-query";
import UserApiService from "~/services/user-api.service";

export function postGroupOptions() {
	return queryOptions({
		queryKey: ["posts", "favorite"],
		queryFn: UserApiService.getFavorites,
	});
}

export function useFavoritePosts() {
	const q = useQuery(postGroupOptions());

	return {
		isFavorite(id: number) {
			return q.data?.some((post) => post.id === id) || false;
		},
		...q,
	};
}
