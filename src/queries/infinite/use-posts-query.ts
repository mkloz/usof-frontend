import { useInfiniteQuery } from "@tanstack/react-query";
import { FilterPostsFormValues } from "~/components/forms/filter-posts-form/use-filter-posts-form";
import { PostApiService } from "~/services/post-api.service";
import { infiniteQueryOptions } from "~/queries/infinite/infinite-query-options";

interface Options {
	enabled?: boolean;
}

export function postGroupOptions(
	params: FilterPostsFormValues,
	opt: Options = {}
) {
	return infiniteQueryOptions({
		queryKey: ["posts", params],
		queryFn: ({ pageParam }) =>
			PostApiService.getMany({ ...params, page: pageParam }),
		...opt,
	});
}

export function usePosts(params: FilterPostsFormValues, opt?: Options) {
	return useInfiniteQuery(postGroupOptions(params, opt));
}
