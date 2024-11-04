import axios from "~/lib/axios";
import { PostApiService } from "~/services/post-api.service";
import { CommentValidator } from "~/types/comment";
import { PaginationOptions, SortOrder } from "~/types/common";
import { PaginatedCommentsValidator } from "~/types/pagination-response";
import { RatingValidator } from "~/types/rating";

export interface GetManyOptions extends PaginationOptions {
	postId?: number;
	userId?: number;
	parentId?: number;
	sortByLikes?: SortOrder;
	sortByDate?: SortOrder;
}
export class CommentApiService {
	static async get(id: number) {
		const res = await axios.get(`/api/v1/comments/${id}`);

		return CommentValidator.parse(res.data);
	}

	static async getMany(opt: GetManyOptions) {
		const res = await axios.get(`/api/v1/comments`, { params: opt });

		return PaginatedCommentsValidator.parse(res.data);
	}

	static create = PostApiService.comment;

	static async delete(id: number) {
		const res = await axios.delete(`/api/v1/comments/${id}`);

		return CommentValidator.parse(res.data);
	}

	static async update(id: number, content: string) {
		const res = await axios.patch(`/api/v1/comments/${id}`, { content });

		return CommentValidator.parse(res.data);
	}

	static async createReaction(commentId: number, type: "LIKE" | "DISLIKE") {
		const response = await axios.post(
			`/api/v1/comments/${commentId}/reactions/my`,
			{
				type,
			}
		);

		return RatingValidator.parse(response.data);
	}

	static async deleteReaction(commentId: number) {
		await axios.delete(`/api/v1/comments/${commentId}/reactions/my`);
	}

	static async updateReaction(commentId: number, type: "LIKE" | "DISLIKE") {
		const response = await axios.patch(
			`/api/v1/comments/${commentId}/reactions/my`,
			{
				type,
			}
		);

		return RatingValidator.parse(response.data);
	}
}
