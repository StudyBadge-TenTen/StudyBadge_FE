import create from "zustand";
import { LocateType, fetchLocate } from "../services/location-api";

interface MapStore {
  selectedLocate: LocateType | null;
  getLocate: (studyChannelId: number, placeId: number | undefined) => Promise<void>;
  selectLocate: (locate: LocateType) => void;
}

export const useMapStore = create<MapStore>((set) => ({
  selectedLocate: null,
  getLocate: async (studyChannelId: number, placeId: number | undefined) => {
    if (!placeId) return;
    try {
      const selectedLocate = await fetchLocate(studyChannelId, placeId);
      set({ selectedLocate });
    } catch (error) {
      console.error("Failed to fetch locates:", error);
    }
  },
  selectLocate: (locate: LocateType) => set({ selectedLocate: locate }),
}));
