import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { PasswordValidator } from "~/utils/validators/password.validator";

export const UpdatePasswordFormSchema = z.object({
	oldPassword: PasswordValidator,
	newPassword: PasswordValidator,
});

export type UpdatePassFormValues = z.infer<typeof UpdatePasswordFormSchema>;

export default function useUpdatePasswordForm(
	defaultValues?: Partial<UpdatePassFormValues>
) {
	const form = useForm<UpdatePassFormValues>({
		resolver: zodResolver(UpdatePasswordFormSchema),
		mode: "all",
		reValidateMode: "onChange",
		defaultValues,
		shouldUseNativeValidation: false,
	});

	return form;
}
