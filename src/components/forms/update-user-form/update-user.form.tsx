import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { User } from "lucide-react";
import { SubmitHandler, useFormState } from "react-hook-form";
import { toast } from "sonner";
import FileInputField from "~/components/forms/inputs/file-input.field";
import { Form } from "~/components/ui/form";
import { useMe, userGroupOptions } from "~/queries/use-me-query";
import { FileApiService } from "~/services/file-api.service";
import UserApiService from "~/services/user-api.service";
import { ApiExceptionSchema } from "~/types/api-error";
import { Button } from "../../ui/button";
import TextInputField from "../inputs/text-input.field";
import useUpdateUserForm, {
	ACCEPTED_FILE_TYPES,
	UpdateUserFormValues,
} from "./use-update-user-form";

interface UpdateUserFormProps {
	onSuccess?: (formValues: UpdateUserFormValues) => void;
}
export default function UpdateUserForm({ onSuccess }: UpdateUserFormProps) {
	const user = useMe();
	const form = useUpdateUserForm({
		fullName: user.data?.fullName,
	});
	const queryClient = useQueryClient();

	const { isValid, isLoading, isSubmitting } =
		useFormState<UpdateUserFormValues>({
			control: form.control,
		});

	const onSubmit: SubmitHandler<UpdateUserFormValues> = async (data) => {
		try {
			const file = data.avatar
				? await FileApiService.upload(data.avatar)
				: undefined;

			await UserApiService.updateMe({
				fullName: data.fullName,
				avatarId: file?.id,
			});
			queryClient.invalidateQueries(userGroupOptions());
			queryClient.invalidateQueries({ queryKey: ["posts"] });

			toast.success("Profile updated successfully");

			onSuccess?.(data);
		} catch (error) {
			if (axios.isAxiosError(error)) {
				const exception = ApiExceptionSchema.safeParse(error.response?.data);
				const message = exception.data?.message;

				if (message?.length) {
					return toast.error(message.toString());
				}
			}
			toast.error("Failed to update profile");
		}
	};
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex h-full flex-col gap-2 w-full"
				noValidate
			>
				<TextInputField
					icon={<User />}
					name="fullName"
					autoComplete="name"
					placeholder="Joe Doe"
					label="Full Name"
				/>
				<FileInputField
					name="avatar"
					label="Avatar"
					accept={ACCEPTED_FILE_TYPES.join(", ")}
					multiple={false}
					placeholder={user.data?.avatar?.name}
				/>
				<Button
					type="submit"
					className="mt-auto btn-secondary font-medium transition-transform "
					disabled={!isValid || isLoading || isSubmitting}
				>
					Update
				</Button>
			</form>
		</Form>
	);
}
