import { useList } from "@uidotdev/usehooks";
import axios from "axios";
import { SubmitHandler, useFormState } from "react-hook-form";
import { toast } from "sonner";
import { PostCategories } from "~/components/custom/post/categories";
import { TextareaInputField } from "~/components/forms/inputs/textaria-input.field";
import { Form } from "~/components/ui/form";
import { Label } from "~/components/ui/label";
import { CustomSelect } from "~/components/ui/select";
import { PostApiService } from "~/services/post-api.service";
import { ApiExceptionSchema } from "~/types/api-error";
import { ICategory } from "~/types/category";
import { PostStatus } from "~/types/post";
import { Button } from "../../ui/button";
import usePostForm, { PostFormValues, PostSchema } from "./use-post-form";

interface PostFormProps {
	onSuccess?: (data: PostFormValues) => void;
	defaultValues?: Partial<PostFormValues>;
}
export default function PostForm({ onSuccess, defaultValues }: PostFormProps) {
	const form = usePostForm(defaultValues);
	const [categories, { push, removeAt, set }] = useList<ICategory>([]);
	const { isValid, isLoading, isSubmitting } = useFormState<PostFormValues>({
		control: form.control,
	});

	const onSubmit: SubmitHandler<PostFormValues> = async (data) => {
		try {
			const post = await PostApiService.create(data);
			await Promise.all(
				categories.map((category) =>
					PostApiService.addCategory(post.id, category.id)
				)
			);
			set([]);
			onSuccess?.(data);

			form.reset({ content: "", title: "", status: PostStatus.PUBLISHED });
			toast.success("Post created successfully");
		} catch (error) {
			if (axios.isAxiosError(error)) {
				const exception = ApiExceptionSchema.safeParse(error.response?.data);
				const message = exception.data?.message;

				if (message?.length) {
					return toast.error(message.toString());
				}

				if (error.response?.status === 401) {
					return toast.error("You are not authorized to create a post");
				}
			}
			toast.error("Failed to create post");
		}
	};
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex h-full flex-col gap-4"
				noValidate
			>
				<Label htmlFor="status">Status</Label>
				<CustomSelect
					options={[
						{ value: PostStatus.DRAFT, label: "Draft" },
						{ value: PostStatus.PUBLISHED, label: "Public" },
						{ value: PostStatus.PRIVATE, label: "Private" },
					]}
					value={form.watch("status")}
					onValueChange={(value) => {
						form.setValue("status", PostSchema.shape.status.parse(value));
					}}
				/>
				<TextareaInputField name="title" label="Title" rows={3} />
				<TextareaInputField name="content" label="Content" rows={8} />
				<PostCategories
					categories={categories}
					onAdd={(category) => {
						push(category);
					}}
					onRemove={(category) => {
						removeAt(categories.findIndex((item) => item.id === category.id));
					}}
				/>
				<Button
					type="submit"
					className="mt-auto btn-secondary font-medium transition-transform "
					disabled={!isValid || isLoading || isSubmitting}
				>
					Create
				</Button>
			</form>
		</Form>
	);
}
