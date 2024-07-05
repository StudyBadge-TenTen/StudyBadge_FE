import { create } from "zustand";
import { SidebarStoreState } from "../types/profile";

const useSidebarStore = create<SidebarStoreState>((set) => ({
  isOpen: false,
  toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export default useSidebarStore;
