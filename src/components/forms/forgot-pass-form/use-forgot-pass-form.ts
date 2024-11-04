import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { EmailValidator } from "~/utils/validators/email.validator";

export const ForgotPasswordFormSchema = z.object({
	email: EmailValidator,
});

export type ForgotPassFormValues = z.infer<typeof ForgotPasswordFormSchema>;

export default function useForgotPasswordForm(
	defaultValues?: Partial<ForgotPassFormValues>
) {
	const form = useForm<ForgotPassFormValues>({
		resolver: zodResolver(ForgotPasswordFormSchema),
		mode: "all",
		reValidateMode: "onChange",
		defaultValues,
		shouldUseNativeValidation: false,
	});

	return form;
}
