import { create } from 'zustand';
import { UserInterface } from '../commons/interfaces/user.interface';
import { createJSONStorage, persist } from 'zustand/middleware';

type userConfigStore = {
    userRole: string;
    addRole: (role: string) => void;
    userInfo: Partial<UserInterface>;
    setUser: (user: Partial<UserInterface>) => void;
}

export const useUserStore = create(persist<userConfigStore>((set) => ({
    userRole: '',
    userInfo: {},
    addRole: (role: string) => set((state) => ({ ...state, userRole: role })),
    setUser: (user: Partial<UserInterface>) => set((state) => ({ ...state, userInfo: user })),
}), {
    name: 'user-data',
    storage: createJSONStorage(() => localStorage)
}))