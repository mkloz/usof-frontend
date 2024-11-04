import {
	ArrowBigUpDash,
	Compass,
	FileText,
	Tag,
	UserCircle2,
	X,
} from "lucide-react";
import { useLocation } from "react-router-dom";
import { Link } from "~/components/custom/link";
import { ShortPostCard } from "~/components/custom/post/short-post-card";
import { Button } from "~/components/ui/button";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Separator } from "~/components/ui/separator";
import { cn } from "~/lib/utils";
import { useMe } from "~/queries/use-me-query";
import { useLastViewedPosts } from "~/stores/last-viewed-posts.store";

const TABS = [
	{
		href: "/posts/popular",
		icon: ArrowBigUpDash,
		label: "Popular",
	},
	{
		href: "/posts/recent",
		icon: Compass,
		label: "Recent",
	},
	{
		href: "/categories",
		icon: Tag,
		label: "Categories",
	},
	{
		href: "/posts",
		icon: FileText,
		label: "Posts",
	},
];

export function Sidebar() {
	const user = useMe();
	const lastViewedPosts = useLastViewedPosts();
	const pathname = useLocation().pathname;
	const linksClasses =
		"flex flex-row items-center gap-2 p-2 rounded-lg hover:bg-mix-primary-20 hover:text-purple transition-colors text-text-secondary";
	return (
		<aside className="flex flex-col gap-2 max-w-80 min-w-72 bg-bg-primary">
			<h2 className="ml-2">Navigate to</h2>
			{TABS.map((tab) => (
				<Link
					to={tab.href}
					key={tab.label}
					className={cn(
						linksClasses,
						pathname === tab.href && "bg-mix-primary-20 text-purple"
					)}
				>
					<tab.icon className="size-6" />
					<p>{tab.label}</p>
				</Link>
			))}
			{user.isAdmin && (
				<Link
					to={`/users`}
					className={cn(
						linksClasses,
						pathname === "/users" && "bg-mix-primary-20 text-purple"
					)}
				>
					<UserCircle2 className="size-6" />
					<p>Users</p>
				</Link>
			)}
			<Separator />
			{!!lastViewedPosts.posts.length && (
				<>
					<div className="flex">
						<h3 className="ml-2">Last viewed</h3>
						<Button
							variant="link"
							onClick={() => lastViewedPosts.clear()}
							className="ml-auto"
						>
							Clear
							<X />
						</Button>
					</div>
					<ScrollArea>
						<ul>
							{lastViewedPosts.posts.map((post) => (
								<li key={post.id}>
									<ShortPostCard post={post} />
								</li>
							))}
						</ul>
					</ScrollArea>
				</>
			)}
		</aside>
	);
}
