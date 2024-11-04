import { z } from "zod";

const ConfigSchema = z.object({
	VITE_BACKEND_URL: z.string().url(),
});

const env = ConfigSchema.parse(import.meta.env);
export const config = {
	backendUrl: env.VITE_BACKEND_URL,
};

export const getConfig = () => config;
export type Config = typeof config;

export default config;
