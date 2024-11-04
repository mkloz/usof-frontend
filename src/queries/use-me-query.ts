import { queryOptions, useQuery } from "@tanstack/react-query";
import UserApiService from "../services/user-api.service";
import { UserRole } from "~/types/user";
import { TimeUtils } from "../utils/time.utils";

export function userGroupOptions() {
	return queryOptions({
		queryKey: ["users", "me"],
		queryFn: UserApiService.me,
		retryDelay: TimeUtils.ONE_MINUTE,
	});
}

export function useMe() {
	const user = useQuery(userGroupOptions());

	return {
		...user,
		exists: !!user.data,
		isAdmin: user.data?.role === UserRole.ADMIN,
		isUser: user.data?.role === UserRole.USER,
	};
}
