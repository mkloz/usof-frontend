import { queryOptions, useQuery } from "@tanstack/react-query";
import UserApiService from "~/services/user-api.service";

export function reactionGroupOptions() {
	return queryOptions({
		queryKey: ["users", "me", "reactions"],
		queryFn: UserApiService.getReactions,
		retry: 0,
	});
}

export function useReactions() {
	const q = useQuery(reactionGroupOptions());

	return {
		...q,
		getReaction({
			postId,
			commentId,
		}: {
			postId?: number;
			commentId?: number;
		}) {
			return (
				q.data?.find(
					(reaction) =>
						(postId && reaction.postId === postId) ||
						(commentId && reaction.commentId === commentId)
				) || null
			);
		},
	};
}
