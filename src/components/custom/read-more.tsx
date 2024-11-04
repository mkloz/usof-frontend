import { useState } from "react";

interface ReadMoreProps {
	id?: string;
	limit?: number;
	children: string;
}

export function ReadMore({ id, children: text, limit = 36 }: ReadMoreProps) {
	const [isExpanded, setIsExpanded] = useState(false);
	const words = text.split(" ");
	const itCanOverflow = words.length > limit;
	const beginText = itCanOverflow ? words.slice(0, limit - 1).join(" ") : text;
	const endText = words.slice(limit - 1).join(" ");

	const handleKeyboard = (e: React.KeyboardEvent<HTMLSpanElement>) => {
		if (e.code === "Space" || e.code === "Enter") {
			setIsExpanded(!isExpanded);
		}
	};

	return (
		<>
			{beginText}
			{itCanOverflow && (
				<>
					{!isExpanded && <span>... </span>}
					<span
						className={`${!isExpanded && "hidden"}`}
						aria-hidden={!isExpanded}
					>
						{endText}
					</span>
					<button
						className="text-violet-400"
						role="button"
						tabIndex={0}
						aria-expanded={isExpanded}
						aria-controls={id}
						onKeyDown={handleKeyboard}
						onClick={(e) => {
							e.preventDefault();
							e.stopPropagation();
							setIsExpanded(!isExpanded);
						}}
					>
						{isExpanded ? "show less" : "show more"}
					</button>
				</>
			)}
		</>
	);
}
