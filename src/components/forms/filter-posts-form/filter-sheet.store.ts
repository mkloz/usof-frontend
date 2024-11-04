import { useStore } from "zustand";
import { createWindowStore } from "~/stores/create-window-store";

export const postsFilterSheetStore = createWindowStore("postsFilterSheet");

export const usePostsFilterSheet = () => useStore(postsFilterSheetStore);
