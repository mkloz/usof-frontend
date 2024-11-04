import { PostSkeleton } from "~/components/async/skeletons/post/post.skeleton";
import { Separator } from "~/components/ui/separator";

export function PostsSkeleton() {
	return (
		<div className="flex flex-col gap-4 m-2">
			{new Array(5).fill(0).map((_, i) => (
				<div key={i} className="flex flex-col gap-4 items-center w-full">
					<PostSkeleton />
					<Separator className="w-11/12 animate-pulse" />
				</div>
			))}
		</div>
	);
}
