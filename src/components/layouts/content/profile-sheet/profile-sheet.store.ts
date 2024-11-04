import { useStore } from "zustand";
import { createWindowStore } from "~/stores/create-window-store";

export const profileSheetStore = createWindowStore("profileSheet");

export const useProfileSheet = () => useStore(profileSheetStore);
