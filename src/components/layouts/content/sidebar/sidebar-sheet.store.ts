import { createWindowStore } from "../../../../stores/create-window-store";
import { useStore } from "zustand";

export const sidebarSheetStore = createWindowStore("sidebar");

export const useSidebarSheet = () => useStore(sidebarSheetStore);
