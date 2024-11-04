import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FormOptional } from "~/types/common";

export const CategorySchema = z.object({
	name: z.string().min(3).max(255),
	description: FormOptional.pipe(z.string().min(3).max(10000).optional()),
});

export type CategoryFormValues = z.infer<typeof CategorySchema>;

export default function useCategoryForm(
	defaultValues?: Partial<CategoryFormValues>
) {
	const form = useForm<CategoryFormValues>({
		resolver: zodResolver(CategorySchema),
		mode: "all",
		reValidateMode: "onChange",
		defaultValues,
		shouldUseNativeValidation: false,
	});

	return form;
}
