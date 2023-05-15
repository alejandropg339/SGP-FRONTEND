import { create } from "zustand";

type globalConfigStore = {
    showLoading: boolean;
    setLoading: (value: boolean) => void;
}

export const useGlobal = create<globalConfigStore>(((set) => ({
    showLoading: false,
    setLoading(value: boolean) {
        set(() => ({ showLoading: value }));
    },
})));