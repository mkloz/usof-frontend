import { SubmitHandler, useFormState } from "react-hook-form";
import { Form } from "~/components/ui/form";
import useUpdatePasswordForm, {
	UpdatePassFormValues,
} from "./use-update-pass-form";
import { ApiExceptionSchema } from "~/types/api-error";
import axios from "axios";
import PasswordInputField from "../inputs/password-input.field";
import { toast } from "sonner";
import { Button } from "../../ui/button";
import UserApiService from "~/services/user-api.service";

interface UpdatePasswordFormProps {
	onSuccess?: (data: UpdatePassFormValues) => void;
	defaultValues?: Partial<UpdatePassFormValues>;
}
export default function UpdatePasswordForm({
	onSuccess,
	defaultValues,
}: UpdatePasswordFormProps) {
	const form = useUpdatePasswordForm(defaultValues);

	const { isValid, isLoading, isSubmitting } =
		useFormState<UpdatePassFormValues>({
			control: form.control,
		});

	const onSubmit: SubmitHandler<UpdatePassFormValues> = async (data) => {
		try {
			await UserApiService.updateMyPassword(data.oldPassword, data.newPassword);
			onSuccess?.(data);
			toast.success("Successfully updated password");
		} catch (error) {
			if (axios.isAxiosError(error)) {
				const exception = ApiExceptionSchema.safeParse(error.response?.data);
				const message = exception.data?.message;

				if (message?.length) {
					return toast.error(message.toString());
				}
			}
			toast.error("Update of password failed. Please try again");
		}
	};
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex h-full flex-col gap-2 w-full"
				noValidate
			>
				<PasswordInputField name="oldPassword" label="Old password" />
				<PasswordInputField name="newPassword" label="New password" />
				<Button
					type="submit"
					className="mt-auto btn-secondary font-medium transition-transform "
					disabled={!isValid || isLoading || isSubmitting}
				>
					Update
				</Button>
			</form>
		</Form>
	);
}
