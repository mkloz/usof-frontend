import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SignInFormSchema } from "../sign-in-form/use-sign-in-form";
import { FullNameValidator } from "~/utils/validators/full-name.validator";

const SignUpFormSchema = SignInFormSchema.extend({
	fullName: FullNameValidator,
});

export type SignUpFormValues = z.infer<typeof SignUpFormSchema>;

export default function useSignUpForm() {
	const form = useForm<SignUpFormValues>({
		resolver: zodResolver(SignUpFormSchema),
		mode: "all",
		reValidateMode: "onChange",
		shouldUseNativeValidation: false,
	});

	return form;
}
