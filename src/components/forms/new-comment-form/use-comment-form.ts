import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FormOptional } from "~/types/common";
import { IdValidator } from "~/utils/validators/id.validator";

export const CreateCommentFormSchema = z.object({
	parentId: FormOptional.pipe(IdValidator.shape.id.optional()),
	postId: IdValidator.shape.id,
	content: z.string().min(1, "Comment cannot be empty"),
});

export type CreateCommentFormValues = z.infer<typeof CreateCommentFormSchema>;

export default function useCreateCommentForm(
	defaultValues?: Partial<CreateCommentFormValues>
) {
	const form = useForm<CreateCommentFormValues>({
		resolver: zodResolver(CreateCommentFormSchema),
		mode: "onSubmit",
		reValidateMode: "onSubmit",
		defaultValues,
		shouldUseNativeValidation: false,
	});

	return form;
}
