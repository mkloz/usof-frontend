import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { EmailValidator } from "~/utils/validators/email.validator";
import { PasswordValidator } from "~/utils/validators/password.validator";

export const ResetPasswordFormSchema = z.object({
	email: EmailValidator,
	password: PasswordValidator,
	code: z.string().length(6, "Must be 6 characters"),
});

export type ResetPassFormValues = z.infer<typeof ResetPasswordFormSchema>;

export default function useResetPasswordForm(
	defaultValues?: Partial<ResetPassFormValues>
) {
	const form = useForm<ResetPassFormValues>({
		resolver: zodResolver(ResetPasswordFormSchema),
		mode: "all",
		reValidateMode: "onChange",
		defaultValues,
		shouldUseNativeValidation: false,
	});

	return form;
}
