import axios from "axios";
import { SubmitHandler, useFormState } from "react-hook-form";
import { toast } from "sonner";
import TextInputField from "~/components/forms/inputs/text-input.field";
import { TextareaInputField } from "~/components/forms/inputs/textaria-input.field";
import { Form } from "~/components/ui/form";
import { CategoryApiService } from "~/services/category-api.service";
import { ApiExceptionSchema } from "~/types/api-error";
import { Button } from "../../ui/button";
import useCategoryForm, { CategoryFormValues } from "./use-category-form";

interface PostFormProps {
	onSuccess?: (data: CategoryFormValues) => void;
	defaultValues?: Partial<CategoryFormValues>;
}
export default function CategoryForm({
	onSuccess,
	defaultValues,
}: PostFormProps) {
	const form = useCategoryForm(defaultValues);

	const { isValid, isLoading, isSubmitting } = useFormState<CategoryFormValues>(
		{
			control: form.control,
		}
	);

	const onSubmit: SubmitHandler<CategoryFormValues> = async (data) => {
		try {
			await CategoryApiService.create(data.name, data.description);
			onSuccess?.(data);
			form.reset({});
			toast.success("Category created successfully");
		} catch (error) {
			if (axios.isAxiosError(error)) {
				const exception = ApiExceptionSchema.safeParse(error.response?.data);
				const message = exception.data?.message;

				if (message?.length) {
					return toast.error(message.toString());
				}
			}
			toast.error("An error occurred while creating the category");
		}
	};
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex h-full flex-col gap-4"
				noValidate
			>
				<TextInputField name="name" label="Name" />
				<TextareaInputField name="description" label="Description" rows={5} />
				<div className="flex flex-row justify-between">
					<Button
						type="reset"
						variant={"secondary"}
						className="mt-auto btn-secondary font-medium transition-transform "
						disabled={!isValid || isLoading || isSubmitting}
						onClick={() => form.reset({ name: "", description: "" })}
					>
						Clear
					</Button>
					<Button
						type="submit"
						className="mt-auto btn-secondary font-medium transition-transform "
						disabled={!isValid || isLoading || isSubmitting}
					>
						Create
					</Button>
				</div>
			</form>
		</Form>
	);
}
