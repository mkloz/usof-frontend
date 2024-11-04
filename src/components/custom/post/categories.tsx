import { useList, useToggle } from "@uidotdev/usehooks";
import { X } from "lucide-react";
import { useState } from "react";
import Fallback from "~/components/async/fallback";
import { ConditionalLink } from "~/components/custom/link";
import InfiniteScroll from "~/components/custom/pagination/infinite-scroll";
import { SearchBar } from "~/components/forms/inputs/search-bar";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "~/components/ui/popover";
import { ScrollArea } from "~/components/ui/scroll-area";
import { cn } from "~/lib/utils";
import { useCategories } from "~/queries/infinite/use-categories-query";
import { ICategory } from "~/types/category";

interface PostCategoriesProps {
	categories?: ICategory[];
	onAdd?: (category: ICategory) => void;
	onRemove?: (category: ICategory) => void;
}

interface AddCategoryProps {
	added: ICategory[];
	onAdd?: (categories: ICategory[]) => void;
}

function AddCategory({ added, onAdd }: AddCategoryProps) {
	const [query, setQuery] = useState("");
	const result = useCategories({ search: query });
	const [selected, { set, push }] = useList<ICategory>();

	return (
		<div className="flex flex-col gap-4">
			<SearchBar
				onSearch={(q) => {
					if (q !== query) {
						setQuery(q);
						result.refetch();
					}
				}}
			/>
			<Fallback
				{...result}
				Empty={
					<div className="flex flex-col items-center justify-center gap-2 p-4">
						<h4 className="text-text-disabled">No categories found</h4>
					</div>
				}
			>
				<ScrollArea className="max-h-40 overflow-y-auto">
					<InfiniteScroll
						query={result}
						exclude={added}
						className="flex flex-wrap w-full gap-2"
						render={(category) => (
							<Badge
								variant={"outline"}
								onClick={() =>
									selected.find((item) => item.id === category.id)
										? set(selected.filter((item) => item.id !== category.id))
										: push(category)
								}
								className={cn(
									"flex gap-2 border-dashed hover:border-solid select-none",
									selected.find((item) => item.id === category.id) &&
										"border-solid bg-text-primary text-text-opposite"
								)}
							>
								{category.name}
							</Badge>
						)}
					/>
				</ScrollArea>
			</Fallback>

			<Button
				className="w-full"
				disabled={selected.length === 0}
				onClick={() => {
					onAdd?.(selected);
				}}
			>
				Add {selected.length} categories
			</Button>
		</div>
	);
}

export function PostCategories({
	categories,
	onAdd,
	onRemove,
}: PostCategoriesProps) {
	const [isOpen, toggle] = useToggle();

	return (
		<ul className="flex gap-2 flex-wrap">
			{categories?.map((category) => (
				<li key={category.id}>
					<ConditionalLink
						to={onRemove ? undefined : `/categories/${category.id}`}
						className="flex p-0"
					>
						<Badge className="flex gap-2">
							<ConditionalLink
								to={onRemove ? `/categories/${category.id}` : undefined}
								onClick={(e) => e.stopPropagation()}
								className="max-w-[15rem] line-clamp-1 break-all"
							>
								{category.name}
							</ConditionalLink>
							{onRemove && (
								<Button
									variant="link"
									onClick={(e) => {
										e.stopPropagation();
										e.preventDefault();
										onRemove(category);
									}}
									className="p-0"
								>
									<X className="size-4 text-text-opposite hover:text-red" />
								</Button>
							)}
						</Badge>
					</ConditionalLink>
				</li>
			))}
			{onAdd && (
				<li>
					<Popover open={isOpen} onOpenChange={toggle} modal>
						<PopoverTrigger asChild>
							<Button
								variant="ghost"
								className="bg-bg-secondary text-xs px-2.5 py-1"
								onClick={() => {
									toggle();
								}}
							>
								+ Add category
							</Button>
						</PopoverTrigger>
						<PopoverContent>
							<AddCategory
								added={categories || []}
								onAdd={(ids) => {
									toggle(false);
									ids.forEach((id) => {
										onAdd(id);
									});
								}}
							/>
						</PopoverContent>
					</Popover>
				</li>
			)}
		</ul>
	);
}
