import { useFormContext } from "react-hook-form";
import {
	FilterPostsFormSchema,
	FilterPostsFormValues,
} from "~/components/forms/filter-posts-form/use-filter-posts-form";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "~/components/ui/form";
import { CustomSelect } from "~/components/ui/select";
import { PostStatus } from "~/types/post";

export function StatusFilterSelect() {
	const form = useFormContext<FilterPostsFormValues>();

	return (
		<FormField
			control={form.control}
			name={"status"}
			render={({ field }) => (
				<FormItem className="flex flex-col gap-1">
					<FormLabel>Status</FormLabel>
					<FormControl>
						<CustomSelect
							options={[
								{ value: "undefined", label: "All" },
								{ value: PostStatus.PUBLISHED, label: "Public" },
								{ value: PostStatus.ARCHIVED, label: "Archived" },
							]}
							value={field.value || "undefined"}
							onValueChange={(value) => {
								form.setValue(
									"status",
									FilterPostsFormSchema.shape.status.parse(value)
								);
							}}
						/>
					</FormControl>
					<FormMessage className="text-sm text-red" />
				</FormItem>
			)}
		/>
	);
}
