import { create } from "zustand";

export const useHotelStore = create((set) => ({
    hotel: JSON.parse(localStorage.getItem('hotel')) || [],
    setHotel: (value) => {
        set({ hotel: value })
        localStorage.setItem('hotel', JSON.stringify(value))
    },
    clearHotel: () => {
        set({ hotel: [] });
        localStorage.removeItem('hotel');
    }
}))
