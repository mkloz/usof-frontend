import { User } from "~/components/custom/user";
import { Separator } from "~/components/ui/separator";

import { useParams } from "react-router-dom";
import Fallback from "~/components/async/fallback";
import { UserSkeleton } from "~/components/async/skeletons/user.skeleton";
import { ShortComments } from "~/components/custom/comment/comments";
import { InfinitePosts } from "~/components/custom/post/posts";
import { Sidebar } from "~/components/layouts/content/sidebar";
import { useComments } from "~/queries/infinite/use-comments-query";
import { usePosts } from "~/queries/infinite/use-posts-query";
import { useUser } from "~/queries/use-user-query";
import { IdValidator } from "~/utils/validators/id.validator";

export default function UserPage() {
	const param = useParams();
	const { id } = IdValidator.parse(param);
	const user = useUser(id);
	const posts = usePosts({ userId: id });
	const comments = useComments({ userId: id });
	const isEmpty = comments.data?.pages.at(0)?.items.length === 0;

	return (
		<div className="w-full flex flex-row">
			<div className="hidden md:flex sticky top-header bottom-0 max-w-xs w-full h-full min-w-fit max-h-screen-no-header p-2 overflow-y-auto border-r-2">
				<Sidebar />
			</div>
			<main className="flex min-w-xs w-full flex-col grow  basis-md">
				<div className="min-h-32 flex items-center justify-center">
					<Fallback {...user} Loading={<UserSkeleton />}>
						<User user={user.data!} />
					</Fallback>
				</div>
				<Separator />
				<InfinitePosts query={posts} />
			</main>
			{!isEmpty && (
				<div className="hidden xl:flex sticky top-header max-h-screen-no-header min-w-60 max-w-sm w-full h-full flex-col grow p-4 overflow-y-auto gap-4">
					<h1 className="mx-2">Comments from user</h1>
					<ShortComments query={comments} separated={false} />
				</div>
			)}
		</div>
	);
}
