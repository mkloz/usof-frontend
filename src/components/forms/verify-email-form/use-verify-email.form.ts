import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { EmailValidator } from "~/utils/validators/email.validator";

export const VerifyEmailFormSchema = z.object({
	email: EmailValidator,
	code: z.string().length(6, "Must be 6 characters"),
});

export type VerifyEmailFormValues = z.infer<typeof VerifyEmailFormSchema>;

export default function useVerifyEmailForm(
	defaultValues?: Partial<VerifyEmailFormValues>
) {
	const form = useForm<VerifyEmailFormValues>({
		resolver: zodResolver(VerifyEmailFormSchema),
		mode: "all",
		reValidateMode: "onChange",
		defaultValues,
		shouldUseNativeValidation: false,
	});

	return form;
}
