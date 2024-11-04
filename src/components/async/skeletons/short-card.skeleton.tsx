import { Separator } from "~/components/ui/separator";
import { Skeleton } from "~/components/ui/skeleton";

export function ShortCardSkeleton() {
	return (
		<article className="flex flex-col p-4 gap-3 rounded-2xl bg-bg-secondary w-full">
			<div className="flex items-center flex-row gap-2 w-full">
				<Skeleton className="size-6" />
				<Skeleton className="w-36 h-5" />
			</div>
			<Skeleton className="w-3/4 h-7" />
			<div className="flex flex-row gap-4 items-center">
				<Skeleton className="w-16 h-8" />
				<Skeleton className="w-12 h-8" />
				<Skeleton className="w-24 ml-auto h-7" />
			</div>
		</article>
	);
}
export function ShortCardsSkeleton({
	separator = false,
}: {
	separator?: boolean;
}) {
	return (
		<div className="flex flex-col gap-4 m-2">
			{new Array(7).fill(0).map((_, i) => (
				<div key={i} className="flex flex-col gap-4 items-center w-full">
					<ShortCardSkeleton />
					{separator && <Separator className="w-11/12 animate-pulse" />}
				</div>
			))}
		</div>
	);
}
