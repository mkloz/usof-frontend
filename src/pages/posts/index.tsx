import { useCallback, useState } from "react";
import { CreatePost } from "~/components/custom/post/create-post";
import { InfinitePosts } from "~/components/custom/post/posts";
import { PostsFilterFormSheet } from "~/components/forms/filter-posts-form/filter-options-sheet";
import FilterPostsForm from "~/components/forms/filter-posts-form/filter-posts.form";
import { FilterPostsFormValues } from "~/components/forms/filter-posts-form/use-filter-posts-form";
import { Sidebar } from "~/components/layouts/content/sidebar";
import { usePosts } from "~/queries/infinite/use-posts-query";

export default function PostsPage() {
	const [options, setOptions] = useState<FilterPostsFormValues | null>(null);
	const posts = usePosts(options || {});

	const onSubmit = useCallback(
		(data: FilterPostsFormValues) => {
			if (JSON.stringify(data) !== JSON.stringify(options)) {
				setOptions(data);
				posts.refetch();
			}
		},
		[options, posts]
	);

	return (
		<div className="w-full flex flex-row">
			<div className="hidden md:flex sticky top-header bottom-0 max-w-xs w-full h-full min-w-fit max-h-screen-no-header p-2 overflow-y-auto border-r-2">
				<Sidebar />
			</div>
			<main className="flex min-w-xs w-full h-full flex-col grow basis-md">
				<CreatePost />
				<InfinitePosts query={posts} />
			</main>
			<div className="hidden xl:flex sticky top-header max-h-screen-no-header min-w-60 max-w-[25rem] w-full h-full flex-col grow p-4 overflow-y-auto bg-bg-secondary">
				<h1 className="mx-2">Options</h1>
				<FilterPostsForm onSubmit={onSubmit} />
			</div>
			<div className="xl:hidden">
				<PostsFilterFormSheet onSubmit={onSubmit} />
			</div>
		</div>
	);
}
