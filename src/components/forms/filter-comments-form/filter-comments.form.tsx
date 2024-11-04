import { ComponentProps } from "react";
import { SortByDateSelect } from "~/components/forms/filter-posts-form/elements/sort-by-date.select";
import { SortByRatingSelect } from "~/components/forms/filter-posts-form/elements/sort-by-rating.select";
import NumberInputField from "~/components/forms/inputs/number-input.field";
import { Form } from "~/components/ui/form";
import { cn } from "~/lib/utils";
import useFilterCommentsForm, {
	FilterCommentsFormValues,
} from "./use-filter-comments-form";

interface FilterCommentsFormProps
	extends Omit<ComponentProps<"form">, "onSubmit"> {
	onSubmit: (data: FilterCommentsFormValues) => void;
	defaultValues?: Partial<FilterCommentsFormValues>;
}

export default function FilterCommentsForm({
	onSubmit,
	defaultValues,
	...props
}: FilterCommentsFormProps) {
	const form = useFilterCommentsForm(onSubmit, defaultValues);

	return (
		<Form {...form}>
			<form
				{...props}
				onSubmit={(e) => {
					e.preventDefault();
					form.submit();
				}}
				className={cn("flex h-full flex-col gap-2 w-full", props.className)}
				noValidate
			>
				<NumberInputField
					name="parentId"
					label="Comment parent ID"
					className="sr-only"
				/>
				<NumberInputField name="postId" label="Post ID" className="sr-only" />
				<NumberInputField name="userId" label="User ID" className="sr-only" />
				<SortByRatingSelect />
				<SortByDateSelect />
			</form>
		</Form>
	);
}
