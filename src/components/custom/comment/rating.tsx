import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { Rating } from "~/components/custom/rating";
import {
	reactionGroupOptions,
	useReactions,
} from "~/queries/use-reactions-query";
import { CommentApiService } from "~/services/comment-api.service";

function useUnVoteMutation(
	entity: { id: number; rating?: number | null },
	setRating: (rating: number) => void
) {
	const { getReaction } = useReactions();
	const reaction = getReaction({ commentId: entity.id });
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: () => CommentApiService.deleteReaction(entity.id),
		onSuccess() {
			setRating(
				reaction?.type === "LIKE"
					? (entity.rating || 0) - 1
					: (entity.rating || 0) + 1
			);
			queryClient.setQueryData(reactionGroupOptions().queryKey, (old) =>
				old?.filter((r) => r.commentId !== entity.id)
			);
		},
		onError(error) {
			if (axios.isAxiosError(error) && error.response?.status === 401) {
				toast.error("You need to be logged in to vote");
			}
		},
	});
}

function useVoteMutation(
	entity: { id: number; rating?: number | null },
	setRating: (rating: number) => void
) {
	const { getReaction } = useReactions();
	const reaction = getReaction({ commentId: entity.id });
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (type: "LIKE" | "DISLIKE") =>
			reaction
				? CommentApiService.updateReaction(entity.id, type)
				: CommentApiService.createReaction(entity.id, type),
		onSuccess(data) {
			queryClient.setQueryData(reactionGroupOptions().queryKey, (old) =>
				old ? [...old.filter((r) => r.commentId !== entity.id), data] : [data]
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
interface CommentRatingProps {
	comment: { id: number; rating?: number | null };
	setRating: (rating: number) => void;
}
export function CommentRating({ comment, setRating }: CommentRatingProps) {
	const { getReaction } = useReactions();
	const reaction = getReaction({ commentId: comment.id });
	const unVote = useUnVoteMutation(comment, setRating);
	const vote = useVoteMutation(comment, setRating);

	return (
		<Rating
			rating={comment.rating || 0}
			onUnVote={() => unVote.mutate()}
			onUpVote={() => vote.mutate("LIKE")}
			onDownVote={() => vote.mutate("DISLIKE")}
			isUpVoted={reaction?.type === "LIKE"}
			isDownVoted={reaction?.type === "DISLIKE"}
			isLoading={vote.isPending || unVote.isPending}
		/>
	);
}
