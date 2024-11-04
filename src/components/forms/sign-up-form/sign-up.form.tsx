import axios from "axios";
import { User } from "lucide-react";
import { SubmitHandler, useFormState } from "react-hook-form";
import { toast } from "sonner";
import { Form } from "~/components/ui/form";
import { AuthApiService } from "~/services/auth-api.service";
import { ApiExceptionSchema } from "~/types/api-error";
import { Button } from "../../ui/button";
import EmailInputField from "../inputs/email-input.field";
import PasswordInputField from "../inputs/password-input.field";
import TextInputField from "../inputs/text-input.field";
import useSignUpForm, { SignUpFormValues } from "./use-sign-up-form";

interface SignUpFormProps {
	onSuccess?: (formValues: SignUpFormValues) => void;
}
export default function SignUpForm({ onSuccess }: SignUpFormProps) {
	const form = useSignUpForm();

	const { isValid, isLoading, isSubmitting } = useFormState<SignUpFormValues>({
		control: form.control,
	});

	const onSubmit: SubmitHandler<SignUpFormValues> = async (data) => {
		try {
			await AuthApiService.register(data);

			toast.success("Registration successful. Please confirm your email");
			onSuccess?.(data);
		} catch (error) {
			if (axios.isAxiosError(error)) {
				const exception = ApiExceptionSchema.safeParse(error.response?.data);
				const message = exception.data?.message;
				if (error.response?.status === 409) {
					onSuccess?.(data);
					return toast.success("Please confirm your email");
				}
				if (message?.length) {
					return toast.error(message.toString());
				}
			}
			toast.error("Registration failed. Please try again");
		}
	};
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex h-full flex-col gap-2"
				noValidate
			>
				<TextInputField
					icon={<User />}
					name="fullName"
					autoComplete="name"
					placeholder="Joe Doe"
					label="Full Name"
				/>
				<EmailInputField name="email" />
				<PasswordInputField name="password" />
				<Button
					type="submit"
					className="mt-auto btn-secondary font-medium transition-transform "
					disabled={!isValid || isLoading || isSubmitting}
				>
					Register
				</Button>
			</form>
		</Form>
	);
}
