import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FullNameValidator } from "~/utils/validators/full-name.validator";

const MAX_UPLOAD_SIZE = 1024 * 1024 * 15; // 15MB
export const ACCEPTED_FILE_TYPES = [
	"image/png",
	"image/jpeg",
	"image/webp",
	"image/jpg",
];

const UpdateUserFormSchema = z.object({
	fullName: FullNameValidator.optional(),
	avatar: z
		.instanceof(FileList)
		.transform((files) => (files.length ? files : undefined))
		.refine((file) => {
			if (!file) return true;
			return file.length <= 1;
		}, "Only one file is allowed")
		.transform((files) => files?.[0])
		.refine((file) => {
			if (!file) return true;
			return file.size <= MAX_UPLOAD_SIZE;
		}, "File size must be less than 15MB")
		.refine((file) => {
			if (!file) return true;
			return ACCEPTED_FILE_TYPES.includes(file?.type || "");
		}, "File must be an image")
		.optional()
		.nullable(),
});

export type UpdateUserFormValues = z.infer<typeof UpdateUserFormSchema>;

export default function useUpdateUserForm(
	defaultValues?: UpdateUserFormValues
) {
	const form = useForm<UpdateUserFormValues>({
		resolver: zodResolver(UpdateUserFormSchema),
		mode: "all",
		reValidateMode: "onChange",
		shouldUseNativeValidation: false,
		defaultValues,
	});

	return form;
}
