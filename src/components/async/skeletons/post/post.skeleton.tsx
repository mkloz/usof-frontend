import { AvatarSkeleton } from "~/components/async/skeletons/avatar.skeleton";
import { Skeleton } from "~/components/ui/skeleton";
import { RandomUtils } from "~/utils/random.utils";

export function PostSkeleton() {
	return (
		<article className="flex flex-col p-4 gap-3 rounded-2xl bg-bg-secondary w-full">
			<div className="flex items-center flex-row gap-2 w-full">
				<div className="flex gap-2 items-center">
					<AvatarSkeleton />
					<Skeleton className="w-40 h-7" />
				</div>
				<Skeleton className="w-32 ml-auto h-9" />
			</div>
			<Skeleton className="w-2/3 h-8" />
			<Skeleton className="w-full h-20" />
			<ul className="flex gap-2 flex-wrap">
				{RandomUtils.getArray(6, () => RandomUtils.getInt(4, 9)).map(
					(rem, i) => (
						<li key={i}>
							<Skeleton className=" h-7" style={{ width: `${rem}rem` }} />
						</li>
					)
				)}
			</ul>
			<div className="flex flex-row gap-4 items-center">
				<Skeleton className="w-20 h-8" />
				<Skeleton className="w-16 h-8" />
				<Skeleton className="w-32 ml-auto h-7" />
			</div>
		</article>
	);
}
