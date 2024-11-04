import { FileText, Tag } from "lucide-react";
import { useParams } from "react-router-dom";
import Fallback from "~/components/async/fallback";
import { InfinitePosts } from "~/components/custom/post/posts";
import { ShortPosts } from "~/components/custom/post/short-posts";
import { ReadMore } from "~/components/custom/read-more";
import { Sidebar } from "~/components/layouts/content/sidebar";
import { Separator } from "~/components/ui/separator";
import { usePosts } from "~/queries/infinite/use-posts-query";
import { useCategory } from "~/queries/use-category-query";
import { ICategory } from "~/types/category";
import { SortOrder } from "~/types/common";
import { IdValidator } from "~/utils/validators/id.validator";

function CategoryCard({ category }: { category: ICategory }) {
	return (
		<div className="flex flex-col items-center justify-center gap-2 m-2	">
			<h3 className="flex flex-row items-center gap-2">
				<Tag />
				{category.name}
			</h3>
			{category.description && (
				<p>
					<ReadMore>{category.description}</ReadMore>
				</p>
			)}
			<div className="flex flex-row gap-2 items-center">
				<FileText />
				<span>{category._count?.posts || 0} posts</span>
			</div>
			<Separator />
		</div>
	);
}

export default function CategoryPage() {
	const params = useParams();
	const { id } = IdValidator.parse(params);
	const category = useCategory(id);
	const posts = usePosts({ categoryId: id, sortByLikes: SortOrder.DESC });
	const recent = usePosts({ sortByDate: SortOrder.DESC, categoryId: id });
	const isEmpty = recent.data?.pages.at(0)?.items.length === 0;

	return (
		<div className="w-full flex flex-row">
			<div className="hidden md:flex sticky top-header bottom-0 max-w-xs w-full h-full min-w-fit max-h-screen-no-header p-2 overflow-y-auto border-r-2">
				<Sidebar />
			</div>
			<main className="flex min-w-xs w-full h-full flex-col grow basis-md">
				<div className="min-h-32">
					<Fallback {...category}>
						<CategoryCard category={category.data!} />
					</Fallback>
				</div>
				<InfinitePosts query={posts} />
			</main>
			{!isEmpty && (
				<div className="hidden xl:flex sticky top-header max-h-screen-no-header min-w-60 max-w-sm w-full h-full flex-col grow p-4 overflow-y-auto">
					<h1 className="mx-2">Recent posts</h1>
					<ShortPosts query={recent} />
				</div>
			)}
		</div>
	);
}
