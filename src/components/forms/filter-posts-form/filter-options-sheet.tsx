import FilterPostsForm from "~/components/forms/filter-posts-form/filter-posts.form";
import { usePostsFilterSheet } from "./filter-sheet.store";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import { FilterPostsFormValues } from "~/components/forms/filter-posts-form/use-filter-posts-form";
import { Button } from "~/components/ui/button";
import { Filter } from "lucide-react";
import { ComponentProps } from "react";

interface PostsFilterFormSheetProps extends ComponentProps<typeof Sheet> {
	onSubmit: (data: FilterPostsFormValues) => void;
}
export function PostsFilterFormSheet({
	onSubmit,
	...props
}: PostsFilterFormSheetProps) {
	const profile = usePostsFilterSheet();

	return (
		<Sheet
			open={profile.isOpen}
			onOpenChange={(v) => profile.set(v)}
			{...props}
		>
			<SheetTrigger>
				<Button
					variant={"link"}
					className="fixed top-header right-0 rounded-l-full text-current mt-4 border-2 border-r-0 w-24 h-12 p-1 items-start pl-3 justify-start translate-x-8 hover:translate-x-0 transition-transform"
				>
					<Filter className="h-full w-auto hover:fill-current" />
				</Button>
			</SheetTrigger>
			<SheetContent side={"right"}>
				<FilterPostsForm onSubmit={onSubmit} />
			</SheetContent>
		</Sheet>
	);
}
