import { queryOptions, useQuery } from "@tanstack/react-query";
import UserApiService from "../services/user-api.service";

export function userGroupOptions(id: number) {
	return queryOptions({
		queryKey: ["users", id],
		queryFn: () => UserApiService.get(id),
	});
}

export function useUser(id: number) {
	return useQuery(userGroupOptions(id));
}
