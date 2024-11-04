import { useFormContext } from "react-hook-form";
import { FilterPostsFormValues } from "~/components/forms/filter-posts-form/use-filter-posts-form";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "~/components/ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
} from "~/components/ui/select";
import { SortOrder } from "~/types/common";

export function SortByDateSelect() {
	const form = useFormContext<FilterPostsFormValues>();

	return (
		<FormField
			control={form.control}
			name={"sortByDate"}
			render={({ field }) => (
				<FormItem className="flex flex-col gap-1">
					<FormLabel>Sort by Date</FormLabel>
					<FormControl>
						<Select
							onValueChange={(val) => field.onChange(val)}
							defaultValue={String(field.value)}
						>
							<SelectTrigger>
								{!field.value ? "Default" : field.value}
							</SelectTrigger>
							<SelectContent>
								{["undefined", SortOrder.ASC, SortOrder.DESC].map((val) => (
									<SelectItem key={val} value={String(val)}>
										{val === "undefined" ? "Default" : val}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</FormControl>
					<FormMessage className="text-sm text-red" />
				</FormItem>
			)}
		/>
	);
}
