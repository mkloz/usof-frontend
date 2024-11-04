import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { TimeUtils } from "~/utils/time.utils";

interface SearchBarProps {
	onSearch: (query: string) => void;
	onSearchClick?: (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		query: string
	) => void;
}
export function SearchBar({ onSearch, onSearchClick }: SearchBarProps) {
	const [query, setQuery] = useState("");
	const [debouncedValue] = useDebounceValue(
		query,
		TimeUtils.ONE_MILLISECOND * 500
	);

	useEffect(() => {
		onSearch(debouncedValue);
	}, [debouncedValue, onSearch]);

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		onSearch(query);
	};

	return (
		<form onSubmit={handleSearch} className="flex w-full  items-center gap-2 ">
			<Input
				type="search"
				placeholder="Search..."
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				className="flex-grow h-10 min-w-40 rounded-xl"
			/>
			<Button
				type="submit"
				size="icon"
				className="max-h-10 min-h-10 min-w-10 max-w-10 border-0  rounded-xl"
				onClick={(e) => {
					onSearchClick?.(e, query);
				}}
				disabled={!query}
			>
				<SearchIcon className="size-6" />
				<span className="sr-only">Search</span>
			</Button>
		</form>
	);
}
