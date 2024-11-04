import axios from "~/lib/axios";
import { CategoryValidator } from "~/types/category";
import { PaginationOptions } from "~/types/common";
import { PaginatedCategoriesValidator } from "~/types/pagination-response";
export interface GetManyCategories extends PaginationOptions {
	search?: string;
}
export class CategoryApiService {
	static async getMany(data: GetManyCategories) {
		const res = await axios.get("/api/v1/categories", { params: data });

		return PaginatedCategoriesValidator.parse(res.data);
	}

	static async get(id: number) {
		const res = await axios.get(`/api/v1/categories/${id}`);

		return CategoryValidator.parse(res.data);
	}

	static async create(name: string, description?: string) {
		const res = await axios.post("/api/v1/categories", { name, description });

		return CategoryValidator.parse(res.data);
	}

	static async update(id: number, name?: string, description?: string) {
		const res = await axios.patch(`/api/v1/categories/${id}`, {
			name,
			description,
		});

		return CategoryValidator.parse(res.data);
	}

	static async delete(id: number) {
		const res = await axios.delete(`/api/v1/categories/${id}`);

		return CategoryValidator.parse(res.data);
	}
}
