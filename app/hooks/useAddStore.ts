import { create } from 'zustand';

export type AddLocation = 'home' | 'planning' | 'exercises' | 'settings' | 'none';

type AddLocationStore = {
    plusLocation: AddLocation;
    setAddLocation: (location: AddLocation) => void;
    resetAddLocation: () => void;
    plusActive: boolean;
};
export const useAddLocation = create<AddLocationStore>((set) => ({
    plusLocation: 'none' as AddLocation,
    setAddLocation: (location: AddLocation) => set({ plusLocation: location, plusActive: true}),
    resetAddLocation: () => set({ plusLocation: 'none', plusActive: false }),
    plusActive: false
}));