import dayjs from "dayjs";
import { ComponentProps } from "react";
import { CommentsCount } from "~/components/custom/comment/comments-count";
import { Link } from "~/components/custom/link";
import { PostRating } from "~/components/custom/post/rating";
import { cn } from "~/lib/utils";
import { IPost } from "~/types/post";
import Avatar from "../avatar";
import { ReadMore } from "../read-more";

interface ShortPostCardProps extends Partial<ComponentProps<typeof Link>> {
	post: IPost;
	className?: string;
}

export function ShortPostCard({
	post,
	className,
	...props
}: ShortPostCardProps) {
	return (
		<Link
			{...props}
			to={`/posts/${post.id}`}
			className={cn(
				"flex flex-col rounded-xl bg-bg-secondary p-4 m-2 gap-1",
				className
			)}
		>
			<Link
				to={`/users/${post.authorId}`}
				onClick={(e) => e.stopPropagation()}
				className="flex items-center flex-row gap-2 w-fit text-text-secondary"
			>
				<Avatar
					src={post.author?.avatar?.url || undefined}
					className="size-6"
				/>
				<h6>{post.author?.fullName || "Deleted user"}</h6>
			</Link>
			<h4>
				<ReadMore limit={20}>{post.title}</ReadMore>
			</h4>
			<div className="flex flex-row gap-4 items-center">
				<PostRating
					post={post}
					setRating={(data) => {
						post.rating = data;
					}}
				/>
				<CommentsCount
					post={{ id: post.id, commentsCount: post._count?.comments }}
				/>
				<span className="ml-auto text-sm text-text-secondary">
					{dayjs(post.createdAt).fromNow()}
				</span>
			</div>
		</Link>
	);
}
