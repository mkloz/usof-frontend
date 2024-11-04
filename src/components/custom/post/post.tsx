import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToggle } from "@uidotdev/usehooks";
import React from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { CommentsCount } from "~/components/custom/comment/comments-count";
import { ConditionalLink } from "~/components/custom/link";
import { PostCategories } from "~/components/custom/post/categories";
import { Favorite } from "~/components/custom/post/favorite";
import { PostRating } from "~/components/custom/post/rating";
import DeleteButton from "~/components/forms/buttons/delete.button";
import EditButton from "~/components/forms/buttons/edit.button";
import ContentEditable from "~/components/forms/inputs/content-editable";
import { Badge } from "~/components/ui/badge";
import { CustomSelect } from "~/components/ui/select";
import { useMe } from "~/queries/use-me-query";
import { usePostCategories } from "~/queries/use-post-categories";
import { PostApiService } from "~/services/post-api.service";
import { IPost, PostStatus } from "~/types/post";
import dayjs from "../../../lib/dayjs";
import Avatar from "../avatar";

interface PostProps {
	post: IPost;
}
function useDeletePostMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: number) => PostApiService.delete(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["posts"] });
		},
	});
}

function useEditPostMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({
			post,
			id,
		}: {
			id: number;
			post: Partial<Omit<IPost, "status">> & {
				status?: PostStatus.DRAFT | PostStatus.PUBLISHED | PostStatus.PRIVATE;
			};
		}) => PostApiService.update(id, post),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["posts"] });
		},
	});
}

function PostStatusBadge({
	post: { status, id },
	editable,
}: {
	editable: boolean;
	post: IPost;
}) {
	const editPost = useEditPostMutation();
	if (!editable) {
		return status !== "PUBLISHED" && <Badge>{status}</Badge>;
	}
	return (
		<CustomSelect
			options={[
				{ value: PostStatus.DRAFT, label: "Draft" },
				{ value: PostStatus.PUBLISHED, label: "Public" },
				{ value: PostStatus.PRIVATE, label: "Private" },
			]}
			value={status}
			onValueChange={(value) => {
				editPost.mutate({
					id,
					post: {
						status: z
							.enum([
								PostStatus.DRAFT,
								PostStatus.PRIVATE,
								PostStatus.PUBLISHED,
							])
							.parse(value),
					},
				});
			}}
		/>
	);
}

function useAddCategoryMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({
			postId,
			categoryId,
		}: {
			postId: number;
			categoryId: number;
		}) => PostApiService.addCategory(postId, categoryId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["posts"] });
		},
	});
}

function useRemoveCategoryMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({
			postId,
			categoryId,
		}: {
			postId: number;
			categoryId: number;
		}) => PostApiService.removeCategory(postId, categoryId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["posts"] });
		},
	});
}

export function Post({ post }: PostProps) {
	const categories = usePostCategories(post.id);
	const deletePost = useDeletePostMutation();
	const editPost = useEditPostMutation();
	const addCategory = useAddCategoryMutation();
	const removeCategory = useRemoveCategoryMutation();
	const navigate = useNavigate();
	const [isEditable, toggle] = useToggle(false);
	const [title, setTitle] = React.useState(post.title);
	const [content, setContent] = React.useState(post.content);
	const { isAdmin, data, exists } = useMe();
	const isMyPost = data?.id === post.authorId;

	return (
		<article className="flex flex-col p-4 gap-3 rounded-2xl bg-bg-secondary">
			<div className="flex items-center flex-row gap-2 w-full">
				<ConditionalLink
					to={post.authorId ? `/users/${post.authorId}` : undefined}
					className="flex gap-2"
				>
					<Avatar src={post.author?.avatar?.url || undefined} />
					<h5>{post.author?.fullName || "Deleted user"}</h5>
				</ConditionalLink>
				<div className="ml-auto flex flex-row">
					<PostStatusBadge post={post} editable={isMyPost} />
					{exists && <Favorite post={post} />}
					{isMyPost && (
						<EditButton
							editable={isEditable}
							className="ml-auto"
							onEdit={toggle}
							onSaveChanges={() => {
								editPost.mutate({ id: post.id, post: { title, content } });
								toggle();
							}}
						/>
					)}
					{(isAdmin || isMyPost) && (
						<DeleteButton
							onDelete={() => {
								deletePost.mutate(post.id);
								navigate(-1);
							}}
						/>
					)}
				</div>
			</div>
			<ContentEditable
				as="h3"
				placeholder="Post title"
				isEditable={isEditable}
				value={title}
				onValueChange={setTitle}
			/>
			<ContentEditable
				as="p"
				isEditable={isEditable}
				placeholder="Post content"
				value={content}
				onValueChange={setContent}
				className="text-text-secondary"
			/>
			<PostCategories
				categories={categories.data?.items}
				onAdd={
					isMyPost
						? (category) => {
								addCategory.mutate({
									postId: post.id,
									categoryId: category.id,
								});
						  }
						: undefined
				}
				onRemove={
					isMyPost
						? (category) => {
								removeCategory.mutate({
									postId: post.id,
									categoryId: category.id,
								});
						  }
						: undefined
				}
			/>
			<div className="flex flex-row gap-4 items-center">
				<PostRating
					post={post}
					setRating={(data) => {
						post.rating = data;
					}}
				/>
				<CommentsCount
					post={{ id: post.id, commentsCount: post._count?.comments }}
				/>
				<span className="ml-auto text-sm text-text-secondary">
					{dayjs(post.createdAt).fromNow()}
				</span>
			</div>
		</article>
	);
}
