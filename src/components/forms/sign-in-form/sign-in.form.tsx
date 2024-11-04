import { SubmitHandler, useFormState } from "react-hook-form";
import { Form } from "~/components/ui/form";
import useSignInForm, { SignInFormValues } from "./use-sign-in-form";
import { AuthApiService } from "~/services/auth-api.service";
import { ApiExceptionSchema } from "~/types/api-error";
import axios from "axios";
import EmailInputField from "../inputs/email-input.field";
import PasswordInputField from "../inputs/password-input.field";
import { toast } from "sonner";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "../../ui/button";
import { useTokens } from "~/stores/tokens.store";
import { AUTH_MODAL_PARAM_KEY } from "../../modals/auth/auth-modal.store";

interface SignInFormProps {
	defaultValues?: Partial<SignInFormValues>;
	onForgotPassword?: () => void;
}
export default function SignInForm({
	defaultValues,
	onForgotPassword,
}: SignInFormProps) {
	const form = useSignInForm(defaultValues);
	const [searchParam, setSearchParams] = useSearchParams();
	const navigate = useNavigate();
	const tokens = useTokens();

	const { isValid, isLoading, isSubmitting } = useFormState<SignInFormValues>({
		control: form.control,
	});
	const onSubmit: SubmitHandler<SignInFormValues> = async (data) => {
		try {
			const res = await AuthApiService.login(data.email, data.password);

			tokens.set(res);
			toast.success("Login successful");
			searchParam.delete(AUTH_MODAL_PARAM_KEY);
			setSearchParams(searchParam);
			navigate(0);
		} catch (error) {
			if (axios.isAxiosError(error)) {
				const exception = ApiExceptionSchema.safeParse(error.response?.data);
				const message = exception.data?.message;

				if (message?.length) {
					return toast.error(message.toString());
				}
			}
			toast.error("Login failed. Please try again");
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
				<PasswordInputField name="password" />
				<Button variant={"link"} onClick={onForgotPassword} className="w-fit">
					Forgot password?
				</Button>

				<Button
					type="submit"
					className="mt-auto btn-secondary font-medium transition-transform "
					disabled={!isValid || isLoading || isSubmitting}
				>
					Login
				</Button>
			</form>
		</Form>
	);
}
