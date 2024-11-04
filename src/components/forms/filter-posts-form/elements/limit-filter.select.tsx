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

export function LimitFilterSelect() {
	const form = useFormContext<FilterPostsFormValues>();

	return (
		<FormField
			control={form.control}
			name={"limit"}
			render={({ field }) => (
				<FormItem className="flex flex-col gap-1">
					<FormLabel>Limit</FormLabel>
					<FormControl>
						<Select
							onValueChange={(val) => field.onChange(val)}
							defaultValue={String(field.value)}
						>
							<SelectTrigger> {field.value}</SelectTrigger>
							<SelectContent>
								{[8, 16, 24].map((val) => (
									<SelectItem key={val} value={String(val)}>
										{val}
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
