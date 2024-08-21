import create from "zustand";
import { LocateType, fetchLocate } from "../services/location-api";
import { devtools } from "zustand/middleware";

interface MapStore {
  selectedLocate: LocateType | null;
  getLocate: (studyChannelId: number, placeId: number | undefined) => Promise<void>;
  selectLocate: (locate: LocateType) => void;
}

const mapStore = (set: any): MapStore => ({
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
});

export const useMapStore = create(import.meta.env.DEV ? devtools(mapStore) : mapStore);
