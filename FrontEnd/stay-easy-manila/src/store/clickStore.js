import { create } from 'zustand'

export const useClickStore = create((set) => ({
    isClicked: false,
    setIsClicked: (value) => set(() => ({isClicked: value})),
    resetClicked: () => set(() => ({isClicked: false}))
}))

