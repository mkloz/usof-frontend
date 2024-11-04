import { SubmitHandler, useFormState } from "react-hook-form";
import { Form } from "~/components/ui/form";
import useForgotPasswordForm, {
	ForgotPassFormValues,
} from "./use-forgot-pass-form";
import { AuthApiService } from "~/services/auth-api.service";
import { ApiExceptionSchema } from "~/types/api-error";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "../../ui/button";
import EmailInputField from "../inputs/email-input.field";

interface ForgotPasswordFormProps {
	onSuccess?: (data: ForgotPassFormValues) => void;
	defaultValues?: Partial<ForgotPassFormValues>;
}
export default function ForgotPasswordForm({
	onSuccess,
	defaultValues,
}: ForgotPasswordFormProps) {
	const form = useForgotPasswordForm(defaultValues);

	const { isValid, isLoading, isSubmitting } =
		useFormState<ForgotPassFormValues>({
			control: form.control,
		});

	const onSubmit: SubmitHandler<ForgotPassFormValues> = async (data) => {
		try {
			await AuthApiService.forgotPassword(data.email);
			onSuccess?.(data);
			toast.success("Email sent. Please check your inbox");
		} catch (error) {
			if (axios.isAxiosError(error)) {
				const exception = ApiExceptionSchema.safeParse(error.response?.data);
				const message = exception.data?.message;

				if (message?.length) {
					return toast.error(message.toString());
				}
			}
			toast.error("Reset failed. Please try again");
		}
	};
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex h-full flex-col gap-2"
				noValidate
			>
				<EmailInputField name="email" />
				<Button
					type="submit"
					className="mt-auto btn-secondary font-medium transition-transform "
					disabled={!isValid || isLoading || isSubmitting}
				>
					Send email
				</Button>
			</form>
		</Form>
	);
}
