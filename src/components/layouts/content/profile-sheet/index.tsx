import { useMe } from "~/queries/use-me-query";
import Avatar from "../../../custom/avatar";
import { Sheet, SheetContent, SheetTrigger } from "../../../ui/sheet";
import { useProfileSheet } from "./profile-sheet.store";
import { ProfileSidebar } from "./profile-sidebar";

export function ProfileSheet() {
	const profile = useProfileSheet();
	const user = useMe();

	return (
		<Sheet open={profile.isOpen} onOpenChange={(v) => profile.set(v)}>
			<SheetTrigger>
				<Avatar src={user.data?.avatar?.url || undefined} />
			</SheetTrigger>
			<SheetContent side={"right"}>
				<ProfileSidebar />
			</SheetContent>
		</Sheet>
	);
}
