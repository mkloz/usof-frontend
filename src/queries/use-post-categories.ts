import { queryOptions, useQuery } from "@tanstack/react-query";
import { PostApiService } from "~/services/post-api.service";

export function postGroupOptions(postId: number) {
	return queryOptions({
		queryKey: ["posts", postId, "categories"],
		queryFn: () => PostApiService.getCategories(postId, { limit: 20 }),
	});
}

export function usePostCategories(postId: number) {
	return useQuery(postGroupOptions(postId));
}
