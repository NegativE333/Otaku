import { create } from "zustand";

export interface ModelStoreInterface{
    movidId?: string;
    isOpen: boolean;
    openModal: (movieId: string) => void;
    closeModal: () => void;
};

const useInfoModal = create<ModelStoreInterface>((set) => ({
    movidId: undefined,
    isOpen: false,
    openModal: (movidId: string) => set({isOpen: true, movidId}),
    closeModal: () => set({ isOpen: false, movidId: undefined}),
}));

export default useInfoModal;