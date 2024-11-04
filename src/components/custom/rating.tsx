import { ChevronsDown, ChevronsUp } from "lucide-react";
import { cn } from "../../lib/utils";

interface RatingProps extends React.ComponentProps<"div"> {
	rating: number;
	onUpVote?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	onDownVote?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	onUnVote?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	isUpVoted?: boolean;
	isDownVoted?: boolean;
	isLoading?: boolean;
}
export function Rating({
	rating,
	onUpVote,
	onDownVote,
	onUnVote,
	isUpVoted,
	isDownVoted,
	isLoading,
	...props
}: RatingProps) {
	return (
		<div {...props} className={cn("flex gap-1", props.className)}>
			<button
				disabled={isLoading}
				onClick={(e) => {
					e.stopPropagation();
					e.preventDefault();

					if (isUpVoted) onUnVote?.(e);
					else onUpVote?.(e);
				}}
			>
				<ChevronsUp
					className={cn(
						"hover:text-green transition-colors",
						isUpVoted && "text-green hover:text-text-primary"
					)}
				/>
			</button>
			<span>{rating}</span>
			<button
				disabled={isLoading}
				onClick={(e) => {
					e.stopPropagation();
					e.preventDefault();

					if (isDownVoted) onUnVote?.(e);
					else onDownVote?.(e);
				}}
			>
				<ChevronsDown
					className={cn(
						"hover:text-red transition-colors",
						isDownVoted && "text-red hover:text-text-primary"
					)}
				/>
			</button>
		</div>
	);
}
