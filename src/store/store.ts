import { create } from 'zustand';

interface StoreState {
  keyword: string;
  category: string;
  selectedSort: string | null;
  selectedView: string;
  selectedMedia: string[];
  selectedStatus: string;
  isFilterApplied: boolean;
  isDropdownOpen: boolean;
  setKeyword: (keyword: string) => void;
  setCategory: (category: string) => void;
  setSelectedSort: (sort: string | null) => void;
  setSelectedView: (view: string) => void;
  setSelectedMedia: (media: string[]) => void;
  setSelectedStatus: (status: string) => void;
  setIsFilterApplied: (isApplied: boolean) => void;
  toggleDropdown: (isOpen: boolean) => void;
}

const useStore = create<StoreState>(set => ({
  keyword: '',
  category: '',
  selectedSort: null,
  selectedView: '',
  selectedMedia: [],
  selectedStatus: '',
  isFilterApplied: false,
  isDropdownOpen: false,
  setKeyword: keyword => set({ keyword }),
  setCategory: category => set({ category }),
  setSelectedSort: sort => set({ selectedSort: sort }),
  setSelectedView: view => set({ selectedView: view }),
  setSelectedMedia: media => set({ selectedMedia: media }),
  setSelectedStatus: status => set({ selectedStatus: status }),
  setIsFilterApplied: isApplied => set({ isFilterApplied: isApplied }),
  toggleDropdown: isOpen => set({ isDropdownOpen: isOpen })
}));

export default useStore;
