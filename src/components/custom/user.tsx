import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChevronsUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { CustomSelect } from "~/components/ui/select";
import { useMe } from "~/queries/use-me-query";
import UserApiService from "~/services/user-api.service";
import { IUser, UserRole } from "~/types/user";
import Avatar from "./avatar";

interface UserProps {
	user: IUser;
}

function useDeleteUserMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: number) => UserApiService.delete(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["users"] });
		},
	});
}

function useUpdateRoleMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: { id: number; role: UserRole }) =>
			UserApiService.updateRole(data.id, data.role),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["users"] });
		},
	});
}
export function User({ user }: UserProps) {
	const deleteUser = useDeleteUserMutation();
	const updateRole = useUpdateRoleMutation();
	const navigate = useNavigate();
	const me = useMe();

	return (
		<article className="flex flex-col gap-2 p-2">
			<div className="flex flex-col  gap-4 ">
				<div className="flex flex-wrap items-start  gap-4 justify-center">
					<Avatar src={user.avatar?.url || undefined} className="size-20" />
					<div className="flex flex-col gap-4">
						<h1>{user.fullName}</h1>
						<div className="flex flex-row items-center">
							<ChevronsUp />
							<p className="mr-2">Rating:</p>
							<span>{user.rating}</span>
						</div>
					</div>
				</div>
				<div className="flex *:basis-1/2 gap-2">
					{me.isAdmin && me.data?.id !== user.id && (
						<Button
							onClick={() => {
								deleteUser.mutate(user.id);
								navigate(-1);
							}}
						>
							Delete user
						</Button>
					)}
					{me.isAdmin && me.data?.id !== user.id && (
						<CustomSelect
							options={[
								{ label: "Admin", value: UserRole.ADMIN },
								{ label: "User", value: UserRole.USER },
							]}
							value={user.role}
							onValueChange={(role) =>
								updateRole.mutate({
									id: user.id,
									role: z.nativeEnum(UserRole).parse(role),
								})
							}
						/>
					)}
				</div>
			</div>
		</article>
	);
}
