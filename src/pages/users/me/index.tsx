import Fallback from "~/components/async/fallback";
import { ShortComments } from "~/components/custom/comment/comments";
import { CreatePost } from "~/components/custom/post/create-post";
import { InfinitePosts } from "~/components/custom/post/posts";
import { User } from "~/components/custom/user";
import { Sidebar } from "~/components/layouts/content/sidebar";
import { Separator } from "~/components/ui/separator";
import { useComments } from "~/queries/infinite/use-comments-query";
import { useMyPosts } from "~/queries/infinite/use-my-posts-query";
import { useMe } from "~/queries/use-me-query";

export default function UserMePage() {
	const user = useMe();
	const posts = useMyPosts();
	const comments = useComments({ userId: user.data?.id });

	const isEmpty = comments.data?.pages.at(0)?.items.length === 0;

	return (
		<div className="w-full flex flex-row">
			<div className="hidden md:flex sticky top-header bottom-0 max-w-xs w-full h-full min-w-fit max-h-screen-no-header p-2 overflow-y-auto border-r-2">
				<Sidebar />
			</div>
			<main className="flex min-w-xs w-full flex-col grow  basis-md">
				<div className="min-h-32 flex items-center justify-center">
					<Fallback {...user}>
						<User user={user.data!} />
					</Fallback>
				</div>
				<Separator />
				<CreatePost />
				<InfinitePosts query={posts} />
			</main>
			{!isEmpty && (
				<div className="hidden xl:flex sticky top-header max-h-screen-no-header min-w-60 max-w-sm w-full h-full flex-col grow p-4 overflow-y-auto gap-4">
					<h1 className="mx-2">Comments from user</h1>
					<ShortComments query={comments} separated={false} />
				</div>
			)}
		</div>
	);
}
