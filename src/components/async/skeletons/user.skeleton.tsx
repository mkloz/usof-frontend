import { Skeleton } from "~/components/ui/skeleton";

export function UserSkeleton() {
	return (
		<div className="flex items-center gap-4 bg-bg-secondary p-4 rounded-2xl">
			<Skeleton className="size-16 rounded-full" />
			<div className="flex flex-col gap-4">
				<Skeleton className="w-40 h-7" />
				<Skeleton className="w-20 h-6" />
			</div>
		</div>
	);
}
