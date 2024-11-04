import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { Rating } from "~/components/custom/rating";
import {
	reactionGroupOptions,
	useReactions,
} from "~/queries/use-reactions-query";
import { PostApiService } from "~/services/post-api.service";

function useUnVoteMutation(
	entity: { id: number; rating?: number | null },
	setRating: (rating: number) => void
) {
	const { getReaction } = useReactions();
	const reaction = getReaction({ postId: entity.id });
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: () => PostApiService.deleteReaction(entity.id),
		onSuccess() {
			setRating(
				reaction?.type === "LIKE"
					? (entity.rating || 0) - 1
					: (entity.rating || 0) + 1
			);
			queryClient.setQueryData(reactionGroupOptions().queryKey, (old) =>
				old?.filter((r) => r.postId !== entity.id)
			);
		},
	});
}

function useVoteMutation(
	entity: { id: number; rating?: number | null },
	setRating: (rating: number) => void
) {
	const { getReaction } = useReactions();
	const reaction = getReaction({ postId: entity.id });
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (type: "LIKE" | "DISLIKE") =>
			reaction
				? PostApiService.updateReaction(entity.id, type)
				: PostApiService.createReaction(entity.id, type),
		onSuccess(data) {
			queryClient.setQueryData(reactionGroupOptions().queryKey, (old) =>
				old ? [...old.filter((r) => r.postId !== entity.id), data] : [data]
			);
			setRating(
				(entity.rating =
					data.type === "LIKE"
						? (entity.rating || 0) + (reaction ? 2 : 1)
						: (entity.rating || 0) - (reaction ? 2 : 1))
			);
		},
		onError(error) {
			if (axios.isAxiosError(error) && error.response?.status === 401) {
				toast.error("You need to be logged in to vote");
			}
		},
	});
}
interface PostRatingProps {
	post: { id: number; rating?: number | null };
	setRating: (rating: number) => void;
}
export function PostRating({ post, setRating }: PostRatingProps) {
	const { getReaction } = useReactions();
	const reaction = getReaction({ postId: post.id });
	const unVote = useUnVoteMutation(post, setRating);
	const vote = useVoteMutation(post, setRating);

	return (
		<Rating
			rating={post.rating || 0}
			onUnVote={() => unVote.mutate()}
			onUpVote={() => vote.mutate("LIKE")}
			onDownVote={() => vote.mutate("DISLIKE")}
			isUpVoted={reaction?.type === "LIKE"}
			isDownVoted={reaction?.type === "DISLIKE"}
			isLoading={vote.isPending || unVote.isPending}
		/>
	);
}
