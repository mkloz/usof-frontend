import { zodResolver } from "@hookform/resolvers/zod";
import { useDebounce } from "@uidotdev/usehooks";
import { useCallback, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { usePostsFilters } from "~/stores/posts-filter-options.store";
import { FormOptional, SortOrder } from "~/types/common";
import { PostStatus } from "~/types/post";

// Define the schema for the form
export const FilterPostsFormSchema = z.object({
	page: FormOptional.pipe(z.number().int().positive().optional()),
	limit: FormOptional.pipe(z.coerce.number().int().positive().optional()),
	categoryId: FormOptional.pipe(z.number().int().positive().optional()),
	status: FormOptional.pipe(
		z.enum([PostStatus.PUBLISHED, PostStatus.ARCHIVED]).optional()
	),
	fromDate: FormOptional.pipe(z.string().date().optional()),
	tillDate: FormOptional.pipe(z.string().date().optional()),
	search: FormOptional.pipe(z.string().optional()),
	userId: FormOptional.pipe(z.number().int().positive().optional()),
	sortByLikes: FormOptional.pipe(z.nativeEnum(SortOrder).optional()),
	sortByDate: FormOptional.pipe(z.nativeEnum(SortOrder).optional()),
});

export type FilterPostsFormValues = z.infer<typeof FilterPostsFormSchema>;

export default function useFilterPostsForm(
	onSubmit: (data: FilterPostsFormValues) => void
) {
	const options = usePostsFilters();
	const form = useForm<FilterPostsFormValues>({
		resolver: zodResolver(FilterPostsFormSchema),
		mode: "all",
		reValidateMode: "onChange",
		defaultValues: options.options || undefined,
		shouldUseNativeValidation: false,
	});
	const formState = useWatch({ control: form.control });
	const debouncedState = useDebounce(formState, 500);

	// Submit handler
	const submit = useCallback(async () => {
		form.handleSubmit((data) => {
			options.set(data);
			onSubmit(data);
		})();
	}, [form, onSubmit, options]);

	// Effect to handle form submission
	useEffect(() => {
		submit();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debouncedState]);

	return {
		...form,
		submit,
	};
}
