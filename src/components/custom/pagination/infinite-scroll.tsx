import { InfiniteData, UseInfiniteQueryResult } from "@tanstack/react-query";
import { useIntersectionObserver } from "@uidotdev/usehooks";
import { ComponentProps, Fragment, useEffect } from "react";
import Loading from "~/components/async/loading";
import { IPaginationResponse } from "~/types/pagination-response";

interface InfiniteScrollProps<TItem extends { id: number }>
	extends ComponentProps<"ul"> {
	query: UseInfiniteQueryResult<
		InfiniteData<IPaginationResponse<TItem>, number>
	>;
	exclude?: { id: number }[];
	render: (item: TItem) => JSX.Element;
}
export default function InfiniteScroll<TItem extends { id: number }>({
	query,
	render,
	exclude,
	...props
}: InfiniteScrollProps<TItem>) {
	const {
		data,
		fetchNextPage,
		fetchPreviousPage,
		hasNextPage,
		isFetchingNextPage,
		hasPreviousPage,
		isFetchingPreviousPage,
		isLoading,
	} = query;

	const [topRef, topEntry] = useIntersectionObserver();
	const [bottomRef, bottomEntry] = useIntersectionObserver();

	useEffect(() => {
		if (
			topEntry?.isIntersecting &&
			hasPreviousPage &&
			!isFetchingPreviousPage
		) {
			fetchPreviousPage();
		}
	}, [fetchPreviousPage, hasPreviousPage, isFetchingPreviousPage, topEntry]);

	useEffect(() => {
		if (bottomEntry?.isIntersecting && hasNextPage && !isFetchingNextPage) {
			fetchNextPage();
		}
	}, [bottomEntry, fetchNextPage, hasNextPage, isFetchingNextPage]);

	if (isLoading) return <Loading />;

	return (
		<div className="w-full">
			<div ref={topRef} className="flex justify-center items-center">
				{isFetchingPreviousPage && <Loading />}
			</div>
			<ul {...props}>
				{data?.pages.map((page) => (
					<Fragment key={page.meta.currentPage}>
						{page.items
							.filter((item) => !exclude?.some((e) => e.id === item.id))
							.map((item) => (
								<li key={item.id}>{render(item)}</li>
							))}
					</Fragment>
				))}
			</ul>
			<div ref={bottomRef} className="flex justify-center items-center">
				{isFetchingNextPage && <Loading />}
			</div>
		</div>
	);
}
