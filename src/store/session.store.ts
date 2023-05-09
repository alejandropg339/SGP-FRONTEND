import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { SessionStateEnum } from "../enums/sessionStates.enum";

type sessionType = 'Active' | 'Expired';

type sessionConfigStore = {
    session: sessionType;
    setSession: (session: sessionType) => void;
    logout: () => void;
}

export const useSessionStore = create(persist<sessionConfigStore>((set) => ({
    session: (JSON.parse(localStorage.getItem('session-data') ?? '{}')?.state?.session as sessionType) ?? 'Expired',
    setSession(session) {
        set(() => ({ session }));
    },
    logout() {
        localStorage.removeItem('token');
        set(() => ({ session: SessionStateEnum.Expired }));
    }
}), {
    name: 'session-data',
    storage: createJSONStorage(() => localStorage),
}));