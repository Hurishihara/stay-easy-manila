import { create } from "zustand";

export const useHotelStore = create((set) => ({
    hotel: undefined,
    setHotel: (value) => set({hotel: value}),
    clearHotel: () => set({hotel: []})
}))
