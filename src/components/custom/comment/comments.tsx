import { ComponentProps } from "react";
import { Empty } from "~/components/async/empty";
import Fallback from "~/components/async/fallback";
import { ShortCardsSkeleton } from "~/components/async/skeletons/short-card.skeleton";
import { ShortCommentCard } from "~/components/custom/comment/short-comment-card";
import InfiniteScroll from "~/components/custom/pagination/infinite-scroll";
import { Separator } from "~/components/ui/separator";
import { IComment } from "~/types/comment";
import { Comment } from "./comment";

interface CommentsProps {
	query: ComponentProps<typeof InfiniteScroll<IComment>>["query"];
	separated?: boolean;
	editable?: boolean;
}

export function ShortComments({ query, editable }: CommentsProps) {
	return (
		<div className="flex grow w-full">
			<Fallback
				{...query}
				Empty={
					<Empty
						message="No comments"
						onReload={query.refetch}
						isReloading={query.isRefetching}
					/>
				}
				Loading={<ShortCardsSkeleton separator={false} />}
			>
				<InfiniteScroll
					query={query}
					className="flex flex-col gap-4 w-full"
					render={(item) => (
						<div className="flex flex-col gap-4 items-center">
							<ShortCommentCard
								comment={item}
								className="w-full"
								id={`comment-${item.id}`}
								editable={editable}
							/>
						</div>
					)}
				/>
			</Fallback>
		</div>
	);
}

export function Comments({
	query,
}: {
	query: ComponentProps<typeof InfiniteScroll<IComment>>["query"];
}) {
	return (
		<div className="flex grow w-full">
			<Fallback
				{...query}
				Empty={
					<Empty
						message="No comments"
						onReload={query.refetch}
						isReloading={query.isRefetching}
					/>
				}
				Loading={<ShortCardsSkeleton separator />}
			>
				<InfiniteScroll
					query={query}
					className="flex flex-col gap-4 w-full"
					render={(item) => (
						<div className="flex flex-col gap-4 items-center">
							<Comment comment={item} className="w-full" />
							<Separator className="w-11/12" />
						</div>
					)}
				/>
			</Fallback>
		</div>
	);
}
