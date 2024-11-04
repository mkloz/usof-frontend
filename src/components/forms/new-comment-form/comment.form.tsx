import axios from "axios";
import { SubmitHandler, useFormState } from "react-hook-form";
import { toast } from "sonner";
import NumberInputField from "~/components/forms/inputs/number-input.field";
import { TextareaInputField } from "~/components/forms/inputs/textaria-input.field";
import { AddEmoji } from "~/components/forms/new-comment-form/add-emoji";
import { Form } from "~/components/ui/form";
import { CommentApiService } from "~/services/comment-api.service";
import { ApiExceptionSchema } from "~/types/api-error";
import { Button } from "../../ui/button";
import useCreateCommentForm, {
	CreateCommentFormValues,
} from "./use-comment-form";

interface CreateCommentFormProps {
	onSuccess?: (data: CreateCommentFormValues) => void;
	defaultValues?: Partial<CreateCommentFormValues>;
}
export default function CreateCommentForm({
	onSuccess,
	defaultValues,
}: CreateCommentFormProps) {
	const form = useCreateCommentForm(defaultValues);

	const { isValid, isLoading, isSubmitting } =
		useFormState<CreateCommentFormValues>({
			control: form.control,
		});

	const onSubmit: SubmitHandler<CreateCommentFormValues> = async (data) => {
		try {
			await CommentApiService.create(data.postId, data.content, data.parentId);
			onSuccess?.(data);
			form.reset({ content: "" });
			toast.success("Comment created successfully");
		} catch (error) {
			if (axios.isAxiosError(error)) {
				const exception = ApiExceptionSchema.safeParse(error.response?.data);
				const message = exception.data?.message;

				if (message?.length) {
					return toast.error(message.toString());
				}
			}
			toast.error("An error occurred while creating the comment");
		}
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex h-full flex-col gap-2"
				noValidate
			>
				<NumberInputField
					name="parentId"
					label="Parent post ID"
					className="sr-only"
				/>
				<NumberInputField name="postId" label="Post ID" className="sr-only" />
				<TextareaInputField name="content" placeholder="Leave a comment" />
				<div className="flex gap-2">
					<AddEmoji
						onEmojiClick={(emoji) => {
							form.setValue(
								"content",
								(form.watch("content") || "") + emoji.emoji
							);
							form.trigger("content");
						}}
					/>
					<Button
						type="reset"
						variant={"outline"}
						className="mt-auto btn-secondary font-medium transition-transform ml-auto px-6"
						disabled={!isValid || isLoading || isSubmitting}
						onClick={() => form.reset({ content: "" })}
					>
						Cancel
					</Button>
					<Button
						type="submit"
						className="mt-auto btn-secondary font-medium transition-transform px-6"
						disabled={!isValid || isLoading || isSubmitting}
					>
						Create
					</Button>
				</div>
			</form>
		</Form>
	);
}
