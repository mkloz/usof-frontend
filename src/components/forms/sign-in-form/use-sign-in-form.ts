import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { EmailValidator } from "~/utils/validators/email.validator";
import { PasswordValidator } from "~/utils/validators/password.validator";

export const SignInFormSchema = z.object({
	email: EmailValidator,
	password: PasswordValidator,
});
export type SignInFormValues = z.infer<typeof SignInFormSchema>;
export default function useSignInForm(
	defaultValues?: Partial<SignInFormValues>
) {
	const form = useForm<SignInFormValues>({
		resolver: zodResolver(SignInFormSchema),
		mode: "all",
		reValidateMode: "onChange",
		defaultValues,
		shouldUseNativeValidation: false,
	});

	return form;
}
