import axios from "../lib/axios";
import { TokensValidator } from "~/stores/tokens.store";
import { UserValidator } from "~/types/user";
import { AxiosInstance } from "axios";

export class AuthApiService {
	static async login(email: string, password: string) {
		const res = await axios.post("/api/v1/auth/login", {
			email,
			password,
		});

		return TokensValidator.parse(res.data);
	}

	static async refresh(
		refreshToken: string,
		axiosInstance: AxiosInstance = axios
	) {
		const res = await axiosInstance.post("/api/v1/auth/refresh", {
			token: refreshToken,
		});

		return TokensValidator.parse(res.data);
	}

	static async register({
		fullName,
		email,
		password,
	}: {
		fullName: string;
		email: string;
		password: string;
	}) {
		const res = await axios.post("/api/v1/auth/register", {
			email,
			fullName,
			password,
		});

		return UserValidator.parse(res.data);
	}

	static async forgotPassword(email: string) {
		await axios.post("/api/v1/auth/forgot-password", {
			email,
		});
	}

	static async resetPassword({
		email,
		code,
		password,
	}: {
		email: string;
		code: string;
		password: string;
	}) {
		await axios.post("/api/v1/auth/reset-password", {
			email,
			code,
			password,
		});
	}

	static async sendVerificationEmail(email: string) {
		await axios.post("/api/v1/auth/send-verification-email", { email });
	}

	static async verifyEmail(email: string, code: string) {
		await axios.post("/api/v1/auth/verify-email", { email, code });
	}
}
