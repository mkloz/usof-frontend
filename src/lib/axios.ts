import { AuthApiService } from "~/services/auth-api.service";
import axios, { CreateAxiosDefaults } from "axios";
import { config } from "~/config";
import { tokensStore } from "~/stores/tokens.store";

const axiosConfig: CreateAxiosDefaults = {
	baseURL: config.backendUrl,
	headers: {
		"Content-type": "application/json",
	},
};

function createAxiosInstance() {
	const instance = axios.create(axiosConfig);

	instance.interceptors.request.use((config) => {
		const tokens = tokensStore.getState().tokens;

		if (tokens?.accessToken) {
			config.headers.Authorization = `Bearer ${tokens.accessToken}`;
		}
		return config;
	});

	return instance;
}

const instance = createAxiosInstance();
const pureInstance = createAxiosInstance();

instance.interceptors.response.use(
	(response) => response,
	async (error) => {
		const tokens = tokensStore.getState().tokens;

		if (
			!axios.isAxiosError(error) ||
			![401, 403].includes(error.response?.status || 0) ||
			!tokens?.refreshToken
		) {
			return Promise.reject(error);
		}
		try {
			const res = await AuthApiService.refresh(
				tokens.refreshToken,
				pureInstance
			);

			tokensStore.setState({ tokens: res });
		} catch (error) {
			tokensStore.setState({ tokens: null });
			return Promise.reject(error);
		}

		return pureInstance.request(error.config || {});
	}
);

export default instance;
