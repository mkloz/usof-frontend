import { createStore, useStore } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { IPost } from "~/types/post";

interface ILastViewedPostsStore {
	posts: IPost[];
	add: (post: IPost) => void;
	remove: (postId: number) => void;
	clear: () => void;
}

export const lastViewedPostsStore = createStore(
	persist<ILastViewedPostsStore>(
		(set) => ({
			posts: [],
			add: (post) =>
				set((state) => {
					if (state.posts.some((e) => e.id === post.id)) return state;
					return { posts: [post, ...state.posts.slice(0, 9)] };
				}),
			remove: (postId) =>
				set((state) => ({
					posts: state.posts.filter((post) => post.id !== postId),
				})),
			clear: () => set({ posts: [] }),
		}),
		{
			name: "last-viewed-posts",
			storage: createJSONStorage(() => sessionStorage),
		}
	)
);

export const useLastViewedPosts = () => useStore(lastViewedPostsStore);
