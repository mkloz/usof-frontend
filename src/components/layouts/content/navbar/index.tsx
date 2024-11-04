import { LogIn, Plus } from "lucide-react";
import { ThemeSwitcher } from "~/components/custom/theme-switcher";
import PostForm from "~/components/forms/new-post-form/post.form";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";
import { PostStatus } from "~/types/post";
import { useMe } from "../../../../queries/use-me-query";
import { Link } from "../../../custom/link";
import { Logo } from "../../../icons/logos/logo";
import { useAuthModal } from "../../../modals/auth/auth-modal.store";
import { Button } from "../../../ui/button";
import { ProfileSheet } from "../profile-sheet";
import { SidebarSheet } from "../sidebar/sidebar-sheet";
import { Search } from "./search";

export default function Navbar() {
	const authModal = useAuthModal();
	const user = useMe();

	return (
		<header className="sticky top-0 z-50">
			<nav className="flex flex-row justify-between p-2 border-b-2 items-center gap-8 backdrop-blur-sm h-full max-h-[var(--header-height)]">
				<div className="flex flex-row gap-2 items-center">
					<SidebarSheet />
					<Logo className="w-8 h-8" />
					<Link to={"/"}>
						<h1>USOF</h1>
					</Link>
				</div>
				<Search className="justify-center" />
				<div className="flex justify-center items-center gap-2">
					{user.isAdmin && (
						<div className="border-3 font-semibold px-2 py-1 rounded-md">
							ADMIN
						</div>
					)}
					{user.exists ? (
						<Dialog>
							<DialogTrigger asChild>
								<Button
									variant="link"
									className="flex gap-2 items-start justify-start p-0 h-fit"
								>
									<Plus className="w-8 h-8" />
									<p className="sr-only">Create Post</p>
								</Button>
							</DialogTrigger>
							<DialogContent>
								<div className="p-6 min-h-[37rem] w-[60rem] max-w-full flex flex-col gap-6">
									<h3 className="text-xl font-bold text-center">Create Post</h3>
									<PostForm defaultValues={{ status: PostStatus.PUBLISHED }} />
								</div>
							</DialogContent>
						</Dialog>
					) : (
						<ThemeSwitcher />
					)}

					{user.exists ? (
						<ProfileSheet />
					) : (
						<Button variant={"link"} onClick={authModal.show}>
							<LogIn className="w-8 h-8" />
						</Button>
					)}
				</div>
			</nav>
		</header>
	);
}
