import { useQuery } from "@tanstack/react-query";
import { createStore, useStore } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { PostApiService } from "~/services/post-api.service";

interface ILastViewedPostsStore {
	postIds: number[];
	add: (postId: number) => void;
	remove: (postId: number) => void;
	clear: () => void;
}

export const lastViewedPostsStore = createStore(
	persist<ILastViewedPostsStore>(
		(set) => ({
			postIds: [],
			add: (postId) =>
				set((state) => {
					if (state.postIds.includes(postId)) return state;
					return { postIds: [postId, ...state.postIds.slice(0, 9)] };
				}),
			remove: (postId) =>
				set((state) => ({
					postIds: state.postIds.filter((id) => id !== postId),
				})),
			clear: () => set({ postIds: [] }),
		}),
		{
			name: "last-viewed-post-ids",
			storage: createJSONStorage(() => sessionStorage),
		}
	)
);

export const useLastViewedPostsStore = () => useStore(lastViewedPostsStore);

export const useLastViewedPosts = () => {
	const lastViewed = useLastViewedPostsStore();

	return {
		query: useQuery({
			queryKey: ["posts", "last-viewed", lastViewed.postIds],
			queryFn: async () => {
				const posts = await Promise.all(
					lastViewed.postIds.map((id) => PostApiService.get(id))
				);
				return posts;
			},
			enabled: lastViewed.postIds.length > 0,
		}),
		...lastViewed,
	};
};
