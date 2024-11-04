import { z } from "zod";
import { createStore, useStore } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const TokensValidator = z.object({
	accessToken: z.string(),
	refreshToken: z.string(),
});

export interface ITokens extends z.infer<typeof TokensValidator> {}
interface ITokensStore {
	tokens: ITokens | null;
	set: (tokens: ITokens) => void;
	delete: () => void;
}

const TOKENS_STORAGE_KEY = "tokens";

export const tokensStore = createStore(
	persist<ITokensStore>(
		(set) => ({
			tokens: null,
			set: (tokens) => set({ tokens }),
			delete: () => set({ tokens: null }),
		}),
		{ name: TOKENS_STORAGE_KEY, storage: createJSONStorage(() => localStorage) }
	)
);

export const useTokens = () => useStore(tokensStore);
