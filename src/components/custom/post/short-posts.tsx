import { ComponentProps } from "react";
import { Empty } from "~/components/async/empty";
import Fallback from "~/components/async/fallback";
import { ShortCardsSkeleton } from "~/components/async/skeletons/short-card.skeleton";
import InfiniteScroll from "~/components/custom/pagination/infinite-scroll";
import { ShortPostCard } from "~/components/custom/post/short-post-card";
import { IPost } from "~/types/post";

interface PostsProps {
	query: ComponentProps<typeof InfiniteScroll<IPost>>["query"];
}

export function ShortPosts({ query }: PostsProps) {
	return (
		<Fallback
			{...query}
			Empty={
				<Empty
					message="No posts"
					onReload={query.refetch}
					isReloading={query.isRefetching}
				/>
			}
			Loading={<ShortCardsSkeleton />}
		>
			<InfiniteScroll
				query={query}
				render={(item) => <ShortPostCard post={item} />}
			/>
		</Fallback>
	);
}
