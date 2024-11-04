import { SubmitHandler, useFormState } from "react-hook-form";
import { Form } from "~/components/ui/form";
import { AuthApiService } from "~/services/auth-api.service";
import { ApiExceptionSchema } from "~/types/api-error";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "../../ui/button";
import EmailInputField from "../inputs/email-input.field";
import { OTPInputField } from "../inputs/otp-input.field";
import useVerifyEmailForm, {
	VerifyEmailFormValues,
} from "./use-verify-email.form";

interface VerifyEmailFormProps {
	onSuccess?: () => void;
	defaultValues?: Partial<VerifyEmailFormValues>;
}
export default function VerifyEmailForm({
	onSuccess,
	defaultValues,
}: VerifyEmailFormProps) {
	const form = useVerifyEmailForm(defaultValues);

	const { isValid, isLoading, isSubmitting } =
		useFormState<VerifyEmailFormValues>({
			control: form.control,
		});

	const onSubmit: SubmitHandler<VerifyEmailFormValues> = async (data) => {
		try {
			await AuthApiService.verifyEmail(data.email, data.code);

			onSuccess?.();
			toast.success("Successfully verified email");
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
				<Button
					type="submit"
					className="mt-auto btn-secondary font-medium transition-transform "
					disabled={!isValid || isLoading || isSubmitting}
				>
					Verify
				</Button>
			</form>
		</Form>
	);
}
