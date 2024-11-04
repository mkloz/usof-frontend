import { cn } from "~/lib/utils";

function Skeleton({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn("animate-pulse rounded-2xl bg-bg-primary", className)}
			{...props}
		/>
	);
}

export { Skeleton };
