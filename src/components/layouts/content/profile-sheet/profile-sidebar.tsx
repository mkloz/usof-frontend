import { useQueryClient } from "@tanstack/react-query";
import { Settings, Star, SunMoon, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Avatar from "~/components/custom/avatar";
import { Link } from "~/components/custom/link";
import { ThemeSwitcher } from "~/components/custom/theme-switcher";
import { useProfileSheet } from "~/components/layouts/content/profile-sheet/profile-sheet.store";
import { SettingsTabs } from "~/components/layouts/content/profile-sheet/settings.tabs";
import { Button, buttonVariants } from "~/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";
import { cn } from "~/lib/utils";
import { useMe, userGroupOptions } from "~/queries/use-me-query";
import { useTokens } from "~/stores/tokens.store";

export function ProfileSidebar() {
	const queryClient = useQueryClient();
	const tokens = useTokens();
	const user = useMe();
	const profile = useProfileSheet();
	const navigate = useNavigate();
	const btnStyle = cn(
		buttonVariants({ variant: "ghost" }),
		"flex items-start justify-start gap-2 items-center p-2"
	);
	return (
		<ul className="flex flex-col gap-2 h-full">
			<Link
				to={`/users/me`}
				className="flex flex-wrap gap-2 mb-6 rounded-xl hover:bg-bg-secondary p-4"
				onClick={profile.hide}
			>
				<Avatar src={user.data?.avatar?.url || undefined} />
				<h3>{user.data?.fullName}</h3>
				<p>{user.data?.email}</p>
			</Link>
			<Link to={`/users/me`} className={btnStyle} onClick={profile.hide}>
				<User /> Profile
			</Link>
			<Link to="/posts/favorite" className={btnStyle} onClick={profile.hide}>
				<Star /> Favorites
			</Link>
			<Dialog>
				<DialogTrigger asChild>
					<Button variant="ghost" className={btnStyle}>
						<Settings />
						Settings
					</Button>
				</DialogTrigger>
				<DialogContent>
					<SettingsTabs />
				</DialogContent>
			</Dialog>
			<div className="flex justify-between p-2">
				<p className="flex gap-2 items-center">
					<SunMoon />
					Dark theme
				</p>
				<ThemeSwitcher />
			</div>
			<Button
				className="mt-auto"
				onClick={() => {
					tokens.delete();
					queryClient.invalidateQueries(userGroupOptions());
					navigate("/");
				}}
			>
				Logout
			</Button>
		</ul>
	);
}
