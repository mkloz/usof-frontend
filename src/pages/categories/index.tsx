import { useQueryClient } from "@tanstack/react-query";
import { useToggle } from "@uidotdev/usehooks";
import { ChevronsDownUp, ChevronsUpDown, SquarePlus } from "lucide-react";
import { Link } from "react-router-dom";
import { Empty } from "~/components/async/empty";
import Fallback from "~/components/async/fallback";
import { ShortCardsSkeleton } from "~/components/async/skeletons/short-card.skeleton";
import { CategoryCard } from "~/components/custom/category-card";
import InfiniteScroll from "~/components/custom/pagination/infinite-scroll";
import CategoryForm from "~/components/forms/new-category-form/category.form";
import { Sidebar } from "~/components/layouts/content/sidebar";
import { Badge } from "~/components/ui/badge";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "~/components/ui/collapsible";
import {
	categoryGroupOptions,
	useCategories,
} from "~/queries/infinite/use-categories-query";
import { useMe } from "~/queries/use-me-query";

export default function CategoriesPage() {
	const categories = useCategories();
	const me = useMe();
	const queryClient = useQueryClient();
	const [isOpen, toggle] = useToggle(false);
	const isEmpty = categories.data?.pages.at(0)?.items.length === 0;

	return (
		<div className="w-full flex flex-row">
			<div className="hidden md:flex sticky top-header bottom-0 max-w-xs w-full h-full min-w-fit max-h-screen-no-header p-2 overflow-y-auto border-r-2">
				<Sidebar />
			</div>
			<main className="flex min-w-xs w-full h-full flex-col grow basis-md">
				{me.isAdmin && (
					<Collapsible
						open={isOpen}
						onOpenChange={toggle}
						className="p-4 bg-bg-secondary m-2 rounded-xl flex flex-col"
					>
						<CollapsibleTrigger className="flex justify-center">
							<h2 className="text-center flex items-center gap-2">
								<SquarePlus />
								Create new category
								{isOpen ? <ChevronsDownUp /> : <ChevronsUpDown />}
							</h2>
						</CollapsibleTrigger>
						<CollapsibleContent>
							<CategoryForm
								onSuccess={() => {
									queryClient.invalidateQueries(categoryGroupOptions());
								}}
							/>
						</CollapsibleContent>
					</Collapsible>
				)}
				<Fallback
					{...categories}
					Empty={
						<Empty
							message="No categories"
							onReload={categories.refetch}
							isReloading={categories.isRefetching}
						/>
					}
					Loading={<ShortCardsSkeleton separator={false} />}
				>
					<InfiniteScroll
						query={categories}
						render={(item) => <CategoryCard category={item} />}
					/>
				</Fallback>
			</main>
			{!isEmpty && (
				<div className="hidden xl:flex sticky top-header max-h-screen-no-header min-w-60 max-w-sm w-full h-full flex-col gap-4 grow p-4 overflow-y-auto">
					<h1>Categories</h1>
					<Fallback
						{...categories}
						Empty={
							<Empty
								message="No categories"
								onReload={categories.refetch}
								isReloading={categories.isRefetching}
							/>
						}
					>
						<InfiniteScroll
							query={categories}
							className="flex flex-row flex-wrap gap-2"
							render={(item) => (
								<Link to={`/categories/${item.id}`}>
									<Badge
										key={item.id}
										variant={"outline"}
										className="max-w-[20rem] line-clamp-1 break-all"
									>
										{item.name}
									</Badge>
								</Link>
							)}
						/>
					</Fallback>
				</div>
			)}
		</div>
	);
}
