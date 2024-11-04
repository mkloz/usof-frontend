import { createStore } from "zustand";
import { persist } from "zustand/middleware";
import { searchParamsStorage } from "./search-param-storage";

interface IModalStore {
	isOpen: boolean;
	show: () => void;
	hide: () => void;
	set: (isOpen: boolean) => void;
}

export function createWindowStore(searchParamKey: string) {
	return createStore(
		persist<IModalStore>(
			(set) => ({
				isOpen: false,
				show: () => set({ isOpen: true }),
				hide: () => set({ isOpen: false }),
				set: (isOpen: boolean) => set({ isOpen }),
			}),
			{
				name: searchParamKey,
				storage: {
					getItem: (name: string) => ({
						state: {
							isOpen: searchParamsStorage.hasItem(name),
						} as IModalStore,
					}),
					setItem: (name, value) => {
						if (value.state.isOpen) {
							searchParamsStorage.setItem(name, "true");
							return;
						}
						searchParamsStorage.removeItem(name);
					},
					removeItem: (name: string) => searchParamsStorage.removeItem(name),
				},
			}
		)
	);
}
