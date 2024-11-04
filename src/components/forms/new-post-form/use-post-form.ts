import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FormOptional } from "~/types/common";
import { PostStatus } from "~/types/post";

export const PostSchema = z.object({
	title: z.string().min(3).max(255),
	content: z.string().min(3).max(10000),
	status: FormOptional.pipe(
		z.enum([PostStatus.DRAFT, PostStatus.PUBLISHED, PostStatus.PRIVATE])
	),
});

export type PostFormValues = z.infer<typeof PostSchema>;

export default function usePostForm(defaultValues?: Partial<PostFormValues>) {
	const form = useForm<PostFormValues>({
		resolver: zodResolver(PostSchema),
		mode: "all",
		reValidateMode: "onChange",
		defaultValues,
		shouldUseNativeValidation: false,
	});

	return form;
}
