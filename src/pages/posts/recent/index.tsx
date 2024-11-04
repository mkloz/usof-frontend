import { InfinitePosts } from "~/components/custom/post/posts";
import { ShortPosts } from "~/components/custom/post/short-posts";
import { Sidebar } from "~/components/layouts/content/sidebar";
import { usePopularPosts } from "~/queries/infinite/use-popular-posts-query";
import { useRecentPosts } from "~/queries/infinite/use-recent-posts-query";

export default function RecentPostsPage() {
	const popular = usePopularPosts();
	const recent = useRecentPosts();
	const isEmpty = popular.data?.pages.at(0)?.items.length === 0;

	return (
		<div className="w-full flex flex-row">
			<div className="hidden md:flex sticky top-header bottom-0 max-w-xs w-full h-full min-w-fit max-h-screen-no-header p-2 overflow-y-auto border-r-2">
				<Sidebar />
			</div>
			<main className="flex min-w-xs w-full h-full flex-col grow  basis-md">
				<InfinitePosts query={recent} />
			</main>
			{!isEmpty && (
				<div className="hidden xl:flex sticky top-header max-h-screen-no-header min-w-60 max-w-sm w-full h-full flex-col grow p-4 overflow-y-auto">
					<h1 className="mx-2">Popular posts</h1>
					<ShortPosts query={popular} />
				</div>
			)}
		</div>
	);
}
