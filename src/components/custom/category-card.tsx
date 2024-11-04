import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToggle } from "@uidotdev/usehooks";
import { FileText, Tag } from "lucide-react";
import React from "react";
import { ConditionalLink } from "~/components/custom/link";
import { ReadMore } from "~/components/custom/read-more";
import DeleteButton from "~/components/forms/buttons/delete.button";
import EditButton from "~/components/forms/buttons/edit.button";
import ContentEditable from "~/components/forms/inputs/content-editable";
import { categoryGroupOptions } from "~/queries/infinite/use-categories-query";
import { useMe } from "~/queries/use-me-query";
import { CategoryApiService } from "~/services/category-api.service";
import { ICategory } from "~/types/category";

interface CategoryCardProps {
	category: ICategory;
}

function useDeleteCategoryMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: number) => CategoryApiService.delete(id),
		onSuccess: () => {
			queryClient.invalidateQueries(categoryGroupOptions());
		},
	});
}

function useUpdateCategoryMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: {
			id: number;
			name: string | undefined;
			description: string | undefined;
		}) => CategoryApiService.update(data.id, data.name, data.description),
		onSuccess: () => {
			queryClient.invalidateQueries(categoryGroupOptions());
		},
	});
}

export function CategoryCard({ category }: CategoryCardProps) {
	const deleteCategory = useDeleteCategoryMutation();
	const updateCategory = useUpdateCategoryMutation();
	const [isEditable, toggle] = useToggle(false);
	const [name, setName] = React.useState(category.name || undefined);
	const [description, setDescription] = React.useState(
		category.description || undefined
	);
	const me = useMe();

	const handleSaveChanges = () => {
		updateCategory.mutate({
			id: category.id,
			name,
			description,
		});
		toggle();
	};

	const descriptionContent = isEditable ? (
		<ContentEditable
			as="p"
			isEditable={isEditable}
			placeholder="Category description"
			value={description}
			onValueChange={setDescription}
		/>
	) : (
		<ReadMore>{category.description || ""}</ReadMore>
	);

	return (
		<ConditionalLink
			to={!isEditable ? `/categories/${category.id}` : undefined}
		>
			<div className="flex flex-col rounded-xl border p-4 m-2 gap-1">
				<div className="flex flex-row items-center gap-2">
					<Tag />
					<ContentEditable
						as="h4"
						placeholder="Category name"
						className="flex flex-row items-center gap-2 break-all grow"
						isEditable={isEditable}
						value={name}
						onValueChange={setName}
					/>
					{me.isAdmin && (
						<>
							<EditButton
								editable={isEditable}
								className="ml-auto"
								onEdit={toggle}
								onSaveChanges={handleSaveChanges}
							/>
							<DeleteButton
								onDelete={() => deleteCategory.mutate(category.id)}
							/>
						</>
					)}
				</div>
				{descriptionContent}
				<div className="flex flex-row gap-1 items-center">
					<FileText />
					<span>{category._count?.posts || 0} posts</span>
				</div>
			</div>
		</ConditionalLink>
	);
}
