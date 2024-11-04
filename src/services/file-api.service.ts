import axios from "~/lib/axios";
import { FileValidator } from "~/types/file";

export class FileApiService {
	static async upload(file: File) {
		const formData = new FormData();
		formData.append("file", file);

		const res = await axios.post("/api/v1/files", formData, {
			headers: { "Content-Type": "multipart/form-data" },
		});

		return FileValidator.parse(res.data);
	}

	static async get(fileId: string) {
		const res = await axios.get(`/api/v1/files/${fileId}`);
		return FileValidator.parse(res.data);
	}

	static async delete(fileId: string) {
		await axios.delete(`/api/v1/files/${fileId}`);
	}
}
