import { useLocation } from "react-router-dom";
import { PaginationLinks } from "~/components/custom/pagination/pagination-links";

interface PaginationProps {
	currentPage: number;
	lastPage: number;
}

function generatePageLink(
	page: number,
	pathname: string,
	search: URLSearchParams
) {
	search.set("page", page.toString());

	return `${pathname}?${search.toString()}`;
}

export default function Pagination({ currentPage, lastPage }: PaginationProps) {
	const location = useLocation();
	const search = new URLSearchParams(location.search);
	const items = [
		{
			href: generatePageLink(currentPage - 1, location.pathname, search),
			page: currentPage - 1,
		},
		{
			href: generatePageLink(currentPage, location.pathname, search),
			page: currentPage,
		},
		{
			href: generatePageLink(currentPage + 1, location.pathname, search),
			page: currentPage + 1,
		},
	];

	return (
		<PaginationLinks
			items={items.filter((item) => item.page !== 0 && item.page <= lastPage)}
			firstPage={{
				href: generatePageLink(1, location.pathname, search),
				page: 1,
			}}
			lastPage={{
				href: generatePageLink(lastPage, location.pathname, search),
				page: lastPage,
			}}
			currentPage={currentPage}
		/>
	);
}
