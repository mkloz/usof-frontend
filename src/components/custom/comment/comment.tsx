import { useQueryClient } from "@tanstack/react-query";
import { ComponentProps, useState } from "react";
import { useToggle } from "usehooks-ts";
import Loading from "~/components/async/loading";
import { ShortComments } from "~/components/custom/comment/comments";
import { ShortCommentCard } from "~/components/custom/comment/short-comment-card";
import FilterCommentsForm from "~/components/forms/filter-comments-form/filter-comments.form";
import CreateCommentForm from "~/components/forms/new-comment-form/comment.form";
import { ScrollArea } from "~/components/ui/scroll-area";
import { cn } from "~/lib/utils";
import { useComments } from "~/queries/infinite/use-comments-query";
import { useMe } from "~/queries/use-me-query";
import { usePost } from "~/queries/use-post-query";
import { GetManyOptions } from "~/services/comment-api.service";
import { IComment } from "~/types/comment";
import { PostStatus } from "~/types/post";

interface CommentProps extends ComponentProps<"article"> {
	comment: IComment;
}

function ReplyComments({ comment }: CommentProps) {
	const [options, setOptions] = useState<GetManyOptions>({
		parentId: comment.id,
	});
	const comments = useComments(options);
	const queryClient = useQueryClient();
	const { data: post, isLoading } = usePost(comment.postId);
	const status = post?.status || PostStatus.PUBLISHED;
	const me = useMe();

	if (isLoading) return <Loading />;

	return (
		<div className="flex pl-4 border-l-4 flex-col gap-2 max-h-screen">
			<div className="flex flex-row items-center flex-wrap justify-between gap-2">
				<h3 className="mx-2" id="comments">
					Replies
				</h3>
				<FilterCommentsForm
					className="flex-row sm:gap-8 ml-auto w-fit"
					onSubmit={(data) => {
						setOptions(data);
						queryClient.invalidateQueries({ queryKey: ["comments"] });
					}}
					defaultValues={{ parentId: comment.id }}
				/>
			</div>
			{me.exists && status === PostStatus.PUBLISHED && (
				<CreateCommentForm
					defaultValues={{ parentId: comment.id, postId: comment.postId }}
					onSuccess={(d) => {
						console.log(d);
						comments.refetch();
					}}
				/>
			)}
			<ScrollArea className="max-h-screen overflow-auto">
				<ShortComments query={comments} editable />
			</ScrollArea>
		</div>
	);
}
export function Comment({ comment, ...props }: CommentProps) {
	const [showReplies, toggleReplies] = useToggle(false);
	return (
		<section
			{...props}
			className={cn(
				"flex gap-4 border-gray-200 rounded-lg flex-col",
				props.className
			)}
		>
			<ShortCommentCard
				comment={comment}
				editable
				onReply={() => toggleReplies()}
			/>
			{showReplies && <ReplyComments comment={comment} />}
		</section>
	);
}
