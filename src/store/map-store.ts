import create from "zustand";
import { Locate, fetchLocates as apiFetchLocates } from "../services/location-api";

interface MapStore {
  locates: Locate[];
  selectedLocates: Locate | null;
  fetchLocates: (lat: number, lng: number) => Promise<void>;
  selectLocate: (locate: Locate) => void;
}

export const useMapStore = create<MapStore>((set) => ({
  locates: [],
  selectedLocates: null,
  fetchLocates: async (lat: number, lng: number) => {
    try {
      const locates = await apiFetchLocates(lat, lng);
      set({ locates });
    } catch (error) {
      console.error("Failed to fetch locates:", error);
    }
  },
  selectLocate: (locate: Locate) => set({ selectedLocates: locate }),
}));
