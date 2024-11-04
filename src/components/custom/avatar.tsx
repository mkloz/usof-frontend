import { CircleUserRound } from "lucide-react";
import { cn } from "../../lib/utils";
import { Avatar as A, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function Avatar({
	className,
	src,
}: {
	className?: string;
	src?: string;
}) {
	return (
		<A className={cn("size-8", className)}>
			<AvatarImage src={src} />
			<AvatarFallback>
				<CircleUserRound className={cn("size-8", className)} />
			</AvatarFallback>
		</A>
	);
}
