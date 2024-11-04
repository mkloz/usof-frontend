import axios from "~/lib/axios";
import { PaginationOptions } from "~/types/common";
import {
	PaginatedPostsValidator,
	PaginatedUsersValidator,
} from "~/types/pagination-response";
import { RatingValidator } from "~/types/rating";
import { UserRole, UserValidator } from "~/types/user";
import { PostValidator } from "./../types/post";

type UserUpdateOptions = {
	fullName?: string;
	avatarId?: number | null;
};

export default class UserApiService {
	static async me() {
		const res = await axios.get("/api/v1/users/me");
		return UserValidator.parse(res.data);
	}

	static async updateMe(data: UserUpdateOptions) {
		const res = await axios.patch("/api/v1/users/me", data);

		return UserValidator.parse(res.data);
	}
	static async updateRole(id: number, role: UserRole) {
		const res = await axios.patch(`/api/v1/users/${id}`, { role });

		return UserValidator.parse(res.data);
	}
	static async updateMyPassword(oldPassword: string, newPassword: string) {
		await axios.patch("/api/v1/users/me/password", {
			oldPassword,
			newPassword,
		});
	}
	static async delete(id: number) {
		await axios.delete(`/api/v1/users/${id}`);
	}
	static async deleteMe() {
		await axios.delete("/api/v1/users/me");
	}

	static async getReactions() {
		const res = await axios.get("/api/v1/users/me/reactions");

		return RatingValidator.array().parse(res.data);
	}

	static async getFavorites() {
		const res = await axios.get("/api/v1/users/me/favorites");

		return PostValidator.array().parse(res.data);
	}

	static async addFavorite(postId: number) {
		const post = await axios.post(`/api/v1/users/me/favorites`, { postId });

		return PostValidator.parse(post.data);
	}

	static async removeFavorite(postId: number) {
		await axios.delete(`/api/v1/users/me/favorites/${postId}`);
	}

	static async getMany(opt: PaginationOptions) {
		const res = await axios.get("/api/v1/users", {
			params: opt,
		});

		return PaginatedUsersValidator.parse(res.data);
	}

	static async get(id: number) {
		const res = await axios.get(`/api/v1/users/${id}`);

		return UserValidator.parse(res.data);
	}

	static async getPosts(opt: PaginationOptions) {
		const res = await axios.get(`/api/v1/users/me/posts`, {
			params: opt,
		});

		return PaginatedPostsValidator.parse(res.data);
	}
}
