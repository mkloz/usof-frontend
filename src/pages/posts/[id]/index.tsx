import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Fallback from "~/components/async/fallback";
import { PostSkeleton } from "~/components/async/skeletons/post/post.skeleton";
import { Comments } from "~/components/custom/comment/comments";
import { Post } from "~/components/custom/post/post";
import { ShortPosts } from "~/components/custom/post/short-posts";
import FilterCommentsForm from "~/components/forms/filter-comments-form/filter-comments.form";
import CreateCommentForm from "~/components/forms/new-comment-form/comment.form";
import { Sidebar } from "~/components/layouts/content/sidebar";
import { Separator } from "~/components/ui/separator";
import {
	commentGroupOptions,
	useComments,
} from "~/queries/infinite/use-comments-query";
import { usePosts } from "~/queries/infinite/use-posts-query";
import { useMe } from "~/queries/use-me-query";
import { usePost } from "~/queries/use-post-query";
import { GetManyOptions } from "~/services/comment-api.service";
import { useLastViewedPosts } from "~/stores/last-viewed-posts.store";
import { PostStatus } from "~/types/post";
import { IdValidator } from "~/utils/validators/id.validator";

export default function PostPage() {
	const param = useParams();
	const { id } = IdValidator.parse(param);
	const post = usePost(id);
	const [options, setOptions] = useState<GetManyOptions | null>(null);
	const comments = useComments(options || undefined);
	const queryClient = useQueryClient();
	const lastViewedPosts = useLastViewedPosts();
	const posts = usePosts(
		{ userId: post.data?.authorId || 0 },
		{ enabled: !!post.data?.authorId }
	);
	const me = useMe();
	const status = post.data?.status || PostStatus.PUBLISHED;
	const isEmpty = posts.data?.pages.at(0)?.items.length === 0;

	useEffect(() => {
		if (post.data) {
			lastViewedPosts.add(post.data.id);
		}
	}, [lastViewedPosts, post.data]);

	return (
		<div className="w-full flex flex-row">
			<div className="hidden md:flex sticky top-header bottom-0 max-w-xs w-full h-full min-w-fit max-h-screen-no-header p-2 overflow-y-auto border-r-2">
				<Sidebar />
			</div>
			<main className="flex min-w-xs w-full h-full flex-col grow basis-md p-2 gap-8">
				<Fallback {...post} Loading={<PostSkeleton />}>
					<Post post={post.data!} />
				</Fallback>
				{[PostStatus.ARCHIVED, PostStatus.PUBLISHED].includes(status) ? (
					<div className="grow flex flex-col gap-6 p-2">
						<div className="flex flex-row items-center flex-wrap justify-between gap-2">
							<Separator />
							<h3 className="mx-4" id="comments">
								Comments
							</h3>
							<FilterCommentsForm
								className="flex-row sm:gap-8 ml-auto w-fit"
								onSubmit={(data) => {
									setOptions(data);
									queryClient.invalidateQueries(
										commentGroupOptions(options || undefined)
									);
								}}
								defaultValues={{ postId: id }}
							/>
						</div>
						{me.exists && status === PostStatus.PUBLISHED && (
							<CreateCommentForm
								defaultValues={{ postId: id }}
								onSuccess={() => {
									comments.refetch();
								}}
							/>
						)}
						<Comments query={comments} />
					</div>
				) : (
					<div className="flex flex-col items-center justify-center  text-text-disabled text-center self-stretch h-full">
						<h4>Comments are disabled.</h4>
						<p>Only public posts can have comments.</p>
					</div>
				)}
			</main>
			{!isEmpty && (
				<div className="hidden xl:flex sticky top-header max-h-screen-no-header min-w-60 max-w-sm w-full h-full flex-col grow p-4 overflow-y-auto">
					<h1 className="mx-2">Other posts from user</h1>
					<ShortPosts query={posts} />
				</div>
			)}
		</div>
	);
}
