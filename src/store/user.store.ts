import { create } from 'zustand';
import { UserInterface, UserResponseDataInterface } from '../commons/interfaces/user.interface';
import { createJSONStorage, persist } from 'zustand/middleware';

type userConfigStore = {
    userRole: string;
    userInfo: Partial<UserInterface>;
    userToEditInfo: Partial<UserResponseDataInterface>
    setUser: (user: Partial<UserInterface>) => void;
    setUserToEdit: (user: Partial<UserResponseDataInterface>) => void;
    addRole: (role: string) => void;
}

export const useUserStore = create(persist<userConfigStore>((set) => ({
    userRole: '',
    userInfo: {},
    userToEditInfo: {},
    addRole: (role: string) => set((state) => ({ ...state, userRole: role })),
    setUser: (user: Partial<UserInterface>) => set((state) => ({ ...state, userInfo: user })),
    setUserToEdit: (user: Partial<UserResponseDataInterface>) => set((state) => ({ ...state, userToEditInfo: user })),
}), {
    name: 'user-data',
    storage: createJSONStorage(() => localStorage)
}))