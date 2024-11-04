import { useFormContext } from "react-hook-form";
import { FilterPostsFormValues } from "~/components/forms/filter-posts-form/use-filter-posts-form";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "~/components/ui/form";
import { CustomSelect } from "~/components/ui/select";
import { SortOrder } from "~/types/common";

export function SortByRatingSelect() {
	const form = useFormContext<FilterPostsFormValues>();

	return (
		<FormField
			control={form.control}
			name={"sortByLikes"}
			render={({ field }) => (
				<FormItem className="flex flex-col gap-1 min-w-[8rem]">
					<FormLabel>Sort by Rating</FormLabel>
					<FormControl>
						<CustomSelect
							options={[
								{ value: SortOrder.ASC, label: "Ascending" },
								{ value: SortOrder.DESC, label: "Descending" },
								{ value: "undefined", label: "Default" },
							]}
							value={field.value || "undefined"}
							onValueChange={(val) => field.onChange(val)}
						/>
					</FormControl>
					<FormMessage className="text-sm text-red" />
				</FormItem>
			)}
		/>
	);
}
