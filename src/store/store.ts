import { create } from 'zustand';

interface StoreState {
  keyword: string;
  category: string;
  setKeyword: (keyword: string) => void;
  setCategory: (category: string) => void;
}

const useStore = create<StoreState>((set: (partial: Partial<StoreState>) => void) => ({
  keyword: '',
  category: '',
  setKeyword: (keyword: string) => set({ keyword }),
  setCategory: (category: string) => set({ category })
}));

export default useStore;
