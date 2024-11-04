import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToggle } from "@uidotdev/usehooks";
import { MessageSquareReply } from "lucide-react";
import React, { ComponentProps } from "react";
import { CommentRating } from "~/components/custom/comment/rating";
import { ReadMore } from "~/components/custom/read-more";
import DeleteButton from "~/components/forms/buttons/delete.button";
import EditButton from "~/components/forms/buttons/edit.button";
import ContentEditable from "~/components/forms/inputs/content-editable";
import { AddEmoji } from "~/components/forms/new-comment-form/add-emoji";
import { Button } from "~/components/ui/button";
import dayjs from "~/lib/dayjs";
import { cn } from "~/lib/utils";
import { useMe } from "~/queries/use-me-query";
import { CommentApiService } from "~/services/comment-api.service";
import { IComment } from "~/types/comment";
import Avatar from "../avatar";
import { Link } from "../link";

interface CommentProps extends ComponentProps<"article"> {
	comment: IComment;
	onReply?: (comment: IComment) => void;
	editable?: boolean;
}
function useDeleteCommentMutation() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id: number) => CommentApiService.delete(id),
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ["comments"] });
		},
	});
}

function useEditCommentMutation() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ id, content }: { id: number; content: string }) =>
			CommentApiService.update(id, content),
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ["comments"] });
		},
	});
}
export function ShortCommentCard({
	comment,
	editable = false,
	onReply,
	...props
}: CommentProps) {
	const me = useMe();
	const deleteComment = useDeleteCommentMutation();
	const editComment = useEditCommentMutation();
	const [isEditable, toggle] = useToggle(false);
	const [content, setContent] = React.useState(comment.content);
	const isMyComment = comment.userId === me.data?.id;

	return (
		<article
			{...props}
			className={cn(
				"flex flex-col gap-2 p-4 bg-bg-secondary rounded-xl",
				props.className
			)}
		>
			<Link
				to={`/users/${comment.userId}`}
				className="flex flex-row items-center gap-4"
			>
				<Avatar
					src={comment?.user?.avatar?.url || undefined}
					className="size-6"
				/>
				<h6>{comment.user?.fullName || "Deleted user"}</h6>
				<span className="text-xs text-text-secondary">
					{dayjs(comment.createdAt).fromNow()}
				</span>
				<div className="ml-auto">
					{isMyComment && editable && (
						<EditButton
							editable={isEditable}
							onEdit={toggle}
							onSaveChanges={() => {
								editComment.mutate({ id: comment.id, content });
								toggle();
							}}
						/>
					)}
					{(me.isAdmin || isMyComment) && editable && (
						<DeleteButton onDelete={() => deleteComment.mutate(comment.id)} />
					)}
				</div>
			</Link>
			{me.isAdmin || isMyComment ? (
				<ContentEditable
					isEditable={isEditable}
					placeholder="Comment content"
					value={content}
					onValueChange={setContent}
				/>
			) : (
				<ReadMore>{comment.content}</ReadMore>
			)}
			<div className="flex flex-row gap-4 items-center">
				<CommentRating
					comment={comment}
					setRating={(data) => {
						comment.rating = data;
					}}
				/>
				{comment._count?.subComments !== undefined && (
					<Button
						variant={"icon"}
						onClick={() => onReply?.(comment)}
						className="flex gap-1 p-0  hover:text-blue-500 transition-colors"
					>
						{onReply && me.exists ? comment._count?.subComments || "Reply" : 0}
						<MessageSquareReply />
					</Button>
				)}
				{isMyComment && isEditable && (
					<AddEmoji
						onEmojiClick={(emoji) => {
							setContent((prev) => prev + emoji.emoji);
						}}
					/>
				)}
			</div>
		</article>
	);
}
