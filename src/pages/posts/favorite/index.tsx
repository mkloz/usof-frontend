import { Posts } from "~/components/custom/post/posts";
import { Sidebar } from "~/components/layouts/content/sidebar";
import { useFavoritePosts } from "~/queries/use-favorite-posts-query";

export default function FavoritesPage() {
	const posts = useFavoritePosts();

	return (
		<div className="w-full flex flex-row">
			<div className="hidden md:flex sticky top-header bottom-0 max-w-xs w-full h-full min-w-fit max-h-screen-no-header p-2 overflow-y-auto border-r-2">
				<Sidebar />
			</div>
			<main className="flex min-w-xs w-full h-full  flex-col grow basis-md self-stretch gap-6">
				<h1 className="text-2xl font-bold text-center mt-2">Favorite posts</h1>
				<Posts query={posts} />
			</main>
		</div>
	);
}
