import { useInfiniteQuery } from "@tanstack/react-query";
import { infiniteQueryOptions } from "~/queries/infinite/infinite-query-options";
import {
	CommentApiService,
	GetManyOptions,
} from "~/services/comment-api.service";

export function commentGroupOptions(options?: GetManyOptions) {
	return infiniteQueryOptions({
		queryKey: ["comments", options],
		queryFn: ({ pageParam }) =>
			CommentApiService.getMany({ ...options, page: pageParam }),
	});
}

export function useComments(options?: GetManyOptions) {
	return useInfiniteQuery(commentGroupOptions(options));
}
