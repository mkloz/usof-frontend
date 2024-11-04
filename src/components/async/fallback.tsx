import { z } from "zod";
import { Empty as EmptyData } from "~/components/async/empty";
import CantLoadError from "~/components/async/errors/cant-load.error";
import Load from "~/components/async/loading";
import { PaginationResponse } from "~/types/pagination-response";
interface FallbackProps {
	children: React.ReactNode;
	Error?: JSX.Element;
	Loading?: JSX.Element;
	Empty?: JSX.Element;
	isError?: boolean;
	data?: object | null;
	isLoading?: boolean;
}
const InfiniteQuery = z.object({ pages: z.array(PaginationResponse) });

function isInfiniteQuery(data: unknown): data is z.infer<typeof InfiniteQuery> {
	return InfiniteQuery.safeParse(data).success;
}
export default function Fallback({
	children,
	data,
	Error = <CantLoadError />,
	Loading = <Load />,
	Empty = <EmptyData />,
	isError,
	isLoading,
}: Readonly<FallbackProps>) {
	if (isLoading) return Loading;
	if (isError) return Error;
	if (!data || Object.keys(data).length === 0) return Empty;
	if (
		isInfiniteQuery(data) &&
		data.pages.every((page) => page.items.length === 0)
	)
		return Empty;
	return <>{children}</>;
}
