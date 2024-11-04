import { ChevronsUp } from "lucide-react";
import Fallback from "~/components/async/fallback";
import Avatar from "~/components/custom/avatar";
import { Link } from "~/components/custom/link";
import InfiniteScroll from "~/components/custom/pagination/infinite-scroll";
import { Sidebar } from "~/components/layouts/content/sidebar";
import dayjs from "~/lib/dayjs";
import { useUsers } from "~/queries/infinite/use-users-query";
import { IUser, UserRole } from "~/types/user";

interface UserProps {
	user: IUser;
}
function UserCard({ user }: UserProps) {
	return (
		<article className="flex flex-col gap-2 p-4 border w-fit rounded-xl">
			<Link
				to={`/users/${user.id}`}
				className="flex flex-wrap flex-row items-start  gap-4 justify-center"
			>
				<div className="flex flex-col gap-4">
					<div className="flex flex-row items-center flex-wrap gap-4 justify-between">
						<Avatar src={user.avatar?.url || undefined} />
						<h4>{user.fullName}</h4>
						<div className="flex ">
							<ChevronsUp />
							<span>{user.rating}</span>
						</div>
					</div>
					<p>{user.email}</p>
					<p>
						{user.role === UserRole.ADMIN ? "Admin" : "User"} for{" "}
						{dayjs(user.createdAt).fromNow(true)}
					</p>
				</div>
			</Link>
		</article>
	);
}

export default function UsersPage() {
	const users = useUsers();

	return (
		<div className="w-full flex flex-row">
			<div className="hidden md:flex sticky top-header bottom-0 max-w-xs w-full h-full min-w-fit max-h-screen-no-header p-2 overflow-y-auto border-r-2">
				<Sidebar />
			</div>
			<main className="flex min-w-xs w-full h-full flex-col grow basis-md p-8">
				<Fallback {...users}>
					<InfiniteScroll
						query={users}
						className="flex flex-row flex-wrap gap-4 justify-center"
						render={(user) => <UserCard user={user} />}
					/>
				</Fallback>
			</main>
		</div>
	);
}
