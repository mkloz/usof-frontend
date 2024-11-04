import { queryOptions, useQuery } from "@tanstack/react-query";
import { CategoryApiService } from "~/services/category-api.service";

export function categoryGroupOptions(categoryId: number) {
	return queryOptions({
		queryKey: ["categories", categoryId],
		queryFn: () => CategoryApiService.get(categoryId),
	});
}

export function useCategory(categoryId: number) {
	return useQuery(categoryGroupOptions(categoryId));
}
