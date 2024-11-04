import { AlignJustify } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../../../ui/sheet";
import { Sidebar } from ".";
import { useSidebarSheet } from "./sidebar-sheet.store";

export function SidebarSheet() {
	const sidebar = useSidebarSheet();

	return (
		<Sheet open={sidebar.isOpen} onOpenChange={(v) => sidebar.set(v)}>
			<SheetTrigger>
				<AlignJustify className="w-8 h-8 md:hidden" />
			</SheetTrigger>
			<SheetContent side={"left"}>
				<Sidebar />
			</SheetContent>
		</Sheet>
	);
}
