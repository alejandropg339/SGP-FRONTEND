import { create } from 'zustand';
import { UserInterface } from '../commons/interfaces/user.interface';

type userConfigStore = {
    userRole: string;
    addRole: (role: string) => void;
    userInfo: Partial<UserInterface>;
    setUser: (user: Partial<UserInterface>) => void;
}

export const useUserStore = create<userConfigStore>((set) => ({
    userRole: '',
    userInfo: {},
    addRole: (role: string) => set((state) => ({ ...state, userRole: role })),
    setUser: (user: Partial<UserInterface>) => set((state) => ({ ...state, userInfo: user })),
}))