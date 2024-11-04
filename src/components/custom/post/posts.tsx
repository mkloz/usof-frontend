import { UseQueryResult } from "@tanstack/react-query";
import { ComponentProps } from "react";
import { Empty } from "~/components/async/empty";
import Fallback from "~/components/async/fallback";
import { PostsSkeleton } from "~/components/async/skeletons/post/posts.skeleton";
import InfiniteScroll from "~/components/custom/pagination/infinite-scroll";
import { PostCard } from "~/components/custom/post/post-card";
import { Separator } from "~/components/ui/separator";
import { IPost } from "~/types/post";

interface InfinitePostsProps {
	query: ComponentProps<typeof InfiniteScroll<IPost>>["query"];
}

export function InfinitePosts({ query }: InfinitePostsProps) {
	return (
		<div className="flex flex-col m-2 grow ">
			<Fallback
				{...query}
				Loading={<PostsSkeleton />}
				Empty={
					<Empty
						message="No posts found"
						onReload={query.refetch}
						isReloading={query.isRefetching}
					/>
				}
			>
				<InfiniteScroll
					query={query}
					className="flex flex-col gap-4"
					render={(item) => (
						<div className="flex flex-col gap-4 items-center">
							<PostCard post={item} className="w-full" />
							<Separator className="w-11/12" />
						</div>
					)}
				/>
			</Fallback>
		</div>
	);
}

interface PostsProps {
	query: UseQueryResult<IPost[]>;
}

export function Posts({ query }: PostsProps) {
	return (
		<div className="flex flex-col m-2 grow ">
			<Fallback
				{...query}
				Loading={<PostsSkeleton />}
				Empty={
					<Empty
						message="No posts found"
						onReload={query.refetch}
						isReloading={query.isRefetching}
					/>
				}
			>
				<ul className="flex flex-col gap-4">
					{query.data?.map((item) => (
						<li className="flex flex-col gap-4 items-center">
							<PostCard post={item} className="w-full" />
							<Separator className="w-11/12" />
						</li>
					))}
				</ul>
			</Fallback>
		</div>
	);
}
