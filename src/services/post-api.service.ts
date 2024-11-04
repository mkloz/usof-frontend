import { FilterPostsFormValues } from "~/components/forms/filter-posts-form/use-filter-posts-form";
import axios from "~/lib/axios";
import { CommentValidator } from "~/types/comment";
import { PaginationOptions } from "~/types/common";
import {
	PaginatedCategoriesValidator,
	PaginatedCommentsValidator,
	PaginatedPostsValidator,
} from "~/types/pagination-response";
import { PostValidator } from "~/types/post";
import { RatingValidator } from "~/types/rating";

interface CreatePostDto {
	title: string;
	content: string;
	status?: "PUBLISHED" | "DRAFT" | "PRIVATE";
}

export class PostApiService {
	static async search(query: string) {
		await new Promise((resolve) => setTimeout(resolve, 1000));
		return PostApiService.getMany({ search: query });
	}

	static async get(postId: number) {
		const response = await axios(`/api/v1/posts/${postId}`);

		return PostValidator.parse(response.data);
	}

	static async getMany(data: FilterPostsFormValues) {
		try {
			const response = await axios.get("/api/v1/posts", { params: data });

			return PaginatedPostsValidator.parse(response.data);
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	static async create(data: CreatePostDto) {
		const response = await axios.post("/api/v1/posts", data);

		return PostValidator.parse(response.data);
	}

	static async createReaction(postId: number, type: "LIKE" | "DISLIKE") {
		const response = await axios.post(`/api/v1/posts/${postId}/reactions/my`, {
			type,
		});

		return RatingValidator.parse(response.data);
	}

	static async updateReaction(postId: number, type: "LIKE" | "DISLIKE") {
		const response = await axios.patch(`/api/v1/posts/${postId}/reactions/my`, {
			type,
		});

		return RatingValidator.parse(response.data);
	}

	static async deleteReaction(postId: number) {
		await axios.delete(`/api/v1/posts/${postId}/reactions/my`);
	}

	static async comment(postId: number, content: string, parentId?: number) {
		const response = await axios.post(`/api/v1/posts/${postId}/comments`, {
			content,
			parentId,
		});

		return CommentValidator.parse(response.data);
	}

	static async delete(postId: number) {
		try {
			const response = await axios.delete(`/api/v1/posts/${postId}`);

			return PostValidator.parse(response.data);
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	static async update(postId: number, data: Partial<CreatePostDto>) {
		const response = await axios.patch(`/api/v1/posts/${postId}`, data);

		return PostValidator.parse(response.data);
	}

	static async getComments(postId: number, opt: PaginationOptions) {
		const response = await axios.get(`/api/v1/posts/${postId}/comments`, {
			params: opt,
		});

		return PaginatedCommentsValidator.parse(response.data);
	}

	static async getCategories(postId: number, opt: PaginationOptions) {
		const response = await axios.get(`/api/v1/posts/${postId}/categories`, {
			params: opt,
		});

		return PaginatedCategoriesValidator.parse(response.data);
	}

	static async addCategory(postId: number, categoryId: number) {
		const res = await axios.post(
			`/api/v1/posts/${postId}/categories/${categoryId}`
		);

		return PostValidator.parse(res.data);
	}

	static async removeCategory(postId: number, categoryId: number) {
		const res = await axios.delete(
			`/api/v1/posts/${postId}/categories/${categoryId}`
		);

		return PostValidator.parse(res.data);
	}
}
