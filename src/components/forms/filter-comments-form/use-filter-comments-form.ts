import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { FormOptional, SortOrder } from "~/types/common";

// Define the schema for the form
export const FilterCommentsFormSchema = z.object({
	postId: FormOptional.pipe(z.number().int().positive().optional()),
	parentId: FormOptional.pipe(z.number().int().positive().optional()),
	userId: FormOptional.pipe(z.number().int().positive().optional()),
	sortByLikes: FormOptional.pipe(z.nativeEnum(SortOrder).optional()),
	sortByDate: FormOptional.pipe(z.nativeEnum(SortOrder).optional()),
});

export type FilterCommentsFormValues = z.infer<typeof FilterCommentsFormSchema>;

export default function useFilterCommentsForm(
	onSubmit: (data: FilterCommentsFormValues) => void,
	defaultValues?: Partial<FilterCommentsFormValues>
) {
	const form = useForm<FilterCommentsFormValues>({
		resolver: zodResolver(FilterCommentsFormSchema),
		mode: "all",
		reValidateMode: "onChange",
		defaultValues: {
			sortByLikes: SortOrder.DESC,
			...defaultValues,
		},
		shouldUseNativeValidation: false,
	});
	const formState = useWatch({ control: form.control });
	// Submit handler
	const submit = useCallback(async () => {
		form.handleSubmit((data) => {
			onSubmit(data);
		})();
	}, [form, onSubmit]);

	// Effect to handle form submission
	useEffect(() => {
		submit();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formState]);

	return {
		...form,
		submit,
	};
}
