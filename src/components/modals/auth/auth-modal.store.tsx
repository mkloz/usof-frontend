import { useStore } from "zustand";
import { createWindowStore } from "~/stores/create-window-store";

export const AUTH_MODAL_PARAM_KEY = "auth-modal";

export const authModalStore = createWindowStore(AUTH_MODAL_PARAM_KEY);

export function useAuthModal() {
	return useStore(authModalStore);
}
