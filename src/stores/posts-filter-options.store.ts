import { createStore, useStore } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { FilterPostsFormValues } from "~/components/forms/filter-posts-form/use-filter-posts-form";
import { searchParamsStorage } from "~/stores/search-param-storage";

interface IPostsFilterOptionsStore {
	options: FilterPostsFormValues | null;
	set: (tokens: FilterPostsFormValues) => void;
	delete: () => void;
}

const POSTS_FILTER_OPTIONS_STORAGE_KEY = "posts-filter";

export const postsFilterOptionsStore = createStore(
	persist<IPostsFilterOptionsStore>(
		(set) => ({
			options: { limit: 16 },
			set: (options) => set({ options }),
			delete: () => set({ options: null }),
		}),
		{
			name: POSTS_FILTER_OPTIONS_STORAGE_KEY,
			storage: createJSONStorage(() => searchParamsStorage),
		}
	)
);

export const usePostsFilters = () => useStore(postsFilterOptionsStore);
