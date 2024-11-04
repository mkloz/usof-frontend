import { useState } from "react";
import Fallback from "~/components/async/fallback";
import InfiniteScroll from "~/components/custom/pagination/infinite-scroll";
import { ShortPostCard } from "~/components/custom/post/short-post-card";
import { SearchBar } from "~/components/forms/inputs/search-bar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "~/components/ui/popover";
import { cn } from "~/lib/utils";
import { usePosts } from "~/queries/infinite/use-posts-query";

export function Search({
	className,
	...props
}: React.ComponentProps<typeof Popover> & { className?: string }) {
	const classes =
		"hidden sm:flex w-[22rem] md:w-[28rem] lg:w-[36rem] xl:w-[44rem]";
	const [query, setQuery] = useState("");
	const result = usePosts({ search: query });
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Popover {...props} open={isOpen} onOpenChange={setIsOpen}>
			<PopoverTrigger className={cn("", classes, className)}>
				<SearchBar
					onSearch={(q) => {
						if (query !== q) {
							if (!isOpen) setIsOpen(true);
							setQuery(q);
							result.refetch();
						}
					}}
					onSearchClick={(e) => {
						e.stopPropagation();
						e.preventDefault();
						if (!isOpen) setIsOpen(true);
					}}
				/>
			</PopoverTrigger>
			<PopoverContent
				onOpenAutoFocus={(e) => e.preventDefault()}
				className={cn(
					"flex p-0 w-full rounded-b-2xl max-h-screen-no-header overflow-auto *:w-full",
					classes,
					className
				)}
			>
				<Fallback
					{...result}
					Empty={
						<div className="flex flex-col items-center justify-center gap-2 p-4">
							<h4 className="text-text-disabled">No results found</h4>
						</div>
					}
				>
					<InfiniteScroll
						query={result}
						className="flex flex-col w-full gap-2 p-2"
						render={(post) => (
							<ShortPostCard
								key={post.id}
								post={post}
								onClick={() => {
									setIsOpen(false);
								}}
							/>
						)}
					/>
				</Fallback>
			</PopoverContent>
		</Popover>
	);
}
