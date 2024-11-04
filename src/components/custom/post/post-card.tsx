import { ComponentProps } from "react";
import { CommentsCount } from "~/components/custom/comment/comments-count";
import { ConditionalLink, Link } from "~/components/custom/link";
import { PostCategories } from "~/components/custom/post/categories";
import { Favorite } from "~/components/custom/post/favorite";
import { PostRating } from "~/components/custom/post/rating";
import { Badge } from "~/components/ui/badge";
import { cn } from "~/lib/utils";
import { useMe } from "~/queries/use-me-query";
import { usePostCategories } from "~/queries/use-post-categories";
import { IPost } from "~/types/post";
import dayjs from "../../../lib/dayjs";
import Avatar from "../avatar";
import { ReadMore } from "../read-more";

interface PostCardProps extends Partial<ComponentProps<typeof Link>> {
	post: IPost;
}

export function PostCard({ post, ...props }: PostCardProps) {
	const categories = usePostCategories(post.id);
	const user = useMe();

	return (
		<article
			{...props}
			className={cn(
				"flex flex-col rounded-2xl hover:bg-bg-secondary p-4 gap-3",
				props.className
			)}
		>
			<div className="flex items-center flex-row gap-2 w-full">
				<ConditionalLink
					to={post.authorId ? `/users/${post.authorId}` : undefined}
					className="flex gap-2"
				>
					<Avatar src={post.author?.avatar?.url || undefined} />
					<h5>{post.author?.fullName || "Deleted user"}</h5>
				</ConditionalLink>
				<div className="ml-auto flex flex-row">
					{post.status !== "PUBLISHED" && (
						<Badge variant={"outline"}>{post.status}</Badge>
					)}
					{user.exists && <Favorite post={post} />}
				</div>
			</div>
			<Link to={`/posts/${post.id}`} className="flex flex-col gap-3">
				<h4>
					<ReadMore limit={20}>{post.title}</ReadMore>
				</h4>
				<p className="text-text-secondary">
					<ReadMore limit={80}>{post.content}</ReadMore>
				</p>
			</Link>
			<PostCategories categories={categories.data?.items} />
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
		</article>
	);
}
