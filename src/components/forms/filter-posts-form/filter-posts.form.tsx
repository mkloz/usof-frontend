import { Search } from "lucide-react";
import { useFormState } from "react-hook-form";
import { LimitFilterSelect } from "~/components/forms/filter-posts-form/elements/limit-filter.select";
import { SortByDateSelect } from "~/components/forms/filter-posts-form/elements/sort-by-date.select";
import { SortByRatingSelect } from "~/components/forms/filter-posts-form/elements/sort-by-rating.select";
import { StatusFilterSelect } from "~/components/forms/filter-posts-form/elements/status-filter.select";
import DateInputField from "~/components/forms/inputs/date-input.field";
import NumberInputField from "~/components/forms/inputs/number-input.field";
import TextInputField from "~/components/forms/inputs/text-input.field";
import { Form } from "~/components/ui/form";
import { Button } from "../../ui/button";
import useFilterPostsForm, {
	FilterPostsFormValues,
} from "./use-filter-posts-form";

interface FilterPostsFormProps {
	onSubmit: (data: FilterPostsFormValues) => void;
}

export default function FilterPostsForm({ onSubmit }: FilterPostsFormProps) {
	const form = useFilterPostsForm(onSubmit);
	const { isValid, isLoading, isSubmitting } =
		useFormState<FilterPostsFormValues>({
			control: form.control,
		});

	return (
		<Form {...form}>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					form.submit();
				}}
				className="flex h-full flex-col gap-2 w-full"
				noValidate
			>
				<NumberInputField name="page" label="Page" className="sr-only" />
				<TextInputField
					name="search"
					label="Search"
					placeholder="Search..."
					icon={<Search />}
				/>
				<div className="flex justify-between flex-wrap *:w-min flex-row w-full gap-2">
					<DateInputField name="fromDate" label="From Date" />
					<DateInputField name="tillDate" label="Till Date" />
				</div>
				<LimitFilterSelect />
				<SortByRatingSelect />
				<SortByDateSelect />
				<StatusFilterSelect />
				<Button
					type="reset"
					variant={"outline"}
					className="mt-auto btn-secondary font-medium transition-transform "
					disabled={!isValid || isLoading || isSubmitting}
					onClick={() => {
						form.reset({
							page: 1,
							limit: 16,
						});
					}}
				>
					Reset
				</Button>
				<Button
					type="submit"
					className="mt-2 btn-primary font-medium transition-transform"
					disabled={!isValid || isLoading || isSubmitting}
				>
					Filter
				</Button>
			</form>
		</Form>
	);
}
