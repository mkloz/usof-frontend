import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Star } from "lucide-react";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import {
	postGroupOptions,
	useFavoritePosts,
} from "~/queries/use-favorite-posts-query";
import UserApiService from "~/services/user-api.service";

function useMakeFavoriteMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (postId: number) => UserApiService.addFavorite(postId),
		onSuccess() {
			queryClient.invalidateQueries(postGroupOptions());
		},
	});
}

function useDeleteFavoriteMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (postId: number) => UserApiService.removeFavorite(postId),
		onSuccess() {
			queryClient.invalidateQueries(postGroupOptions());
		},
	});
}

export function Favorite({ post }: { post: { id: number } }) {
	const { isFavorite } = useFavoritePosts();
	const makeFav = useMakeFavoriteMutation();
	const deleteFav = useDeleteFavoriteMutation();

	return (
		<Button
			variant={"link"}
			onClick={(e) => {
				e.preventDefault();
				e.stopPropagation();

				if (isFavorite(post.id)) deleteFav.mutate(post.id);
				else makeFav.mutate(post.id);
			}}
		>
			<Star
				className={cn(
					"hover:text-yellow",
					isFavorite(post.id) && "fill-current text-yellow"
				)}
			/>
		</Button>
	);
}
