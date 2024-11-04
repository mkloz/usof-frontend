import axios from "axios";
import { SubmitHandler, useFormState } from "react-hook-form";
import { toast } from "sonner";
import { Form } from "~/components/ui/form";
import { AuthApiService } from "~/services/auth-api.service";
import { ApiExceptionSchema } from "~/types/api-error";
import { Button } from "../../ui/button";
import EmailInputField from "../inputs/email-input.field";
import { OTPInputField } from "../inputs/otp-input.field";
import PasswordInputField from "../inputs/password-input.field";
import useResetPasswordForm, {
	ResetPassFormValues,
} from "./use-reset-pass-form";

interface ResetPasswordFormProps {
	onSuccess?: (data: ResetPassFormValues) => void;
	defaultValues?: Partial<ResetPassFormValues>;
}
export default function ResetPasswordForm({
	onSuccess,
	defaultValues,
}: ResetPasswordFormProps) {
	const form = useResetPasswordForm(defaultValues);

	const { isValid, isLoading, isSubmitting } =
		useFormState<ResetPassFormValues>({
			control: form.control,
		});

	const onSubmit: SubmitHandler<ResetPassFormValues> = async (data) => {
		try {
			await AuthApiService.resetPassword(data);
			onSuccess?.(data);
			toast.success("Successfully reset password");
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
				<OTPInputField name="code" label="One time password from email" />
				<EmailInputField name="email" />
				<PasswordInputField name="password" label="New password" />
				<Button
					type="submit"
					className="mt-auto btn-secondary font-medium transition-transform "
					disabled={!isValid || isLoading || isSubmitting}
				>
					Reset
				</Button>
			</form>
		</Form>
	);
}
