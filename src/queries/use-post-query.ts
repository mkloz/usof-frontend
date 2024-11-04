import { queryOptions, useQuery } from "@tanstack/react-query";
import { PostApiService } from "~/services/post-api.service";

export function postGroupOptions(postId: number) {
	return queryOptions({
		queryKey: ["posts", postId],
		queryFn: () => PostApiService.get(postId),
	});
}

export function usePost(postId: number) {
	return useQuery(postGroupOptions(postId));
}
