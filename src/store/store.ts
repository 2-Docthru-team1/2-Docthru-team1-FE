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
  userStatus: 'loggedOut' | 'normal' | 'admin';
  id: string | null;
  role: 'normal' | 'admin' | null;
  isLoading: boolean;
  login: (id: string, role: 'normal' | 'admin') => void;
  logout: () => void;
  setUserStatus: (status: 'loggedOut' | 'normal' | 'admin') => void;
  setLoading: (isLoading: boolean) => void;
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
  isLoading: true,

  setKeyword: keyword => set({ keyword }),
  setCategory: category => set({ category }),
  setSelectedSort: sort => set({ selectedSort: sort }),
  setSelectedView: view => set({ selectedView: view }),
  setSelectedMedia: media => set({ selectedMedia: media }),
  setSelectedStatus: status => set({ selectedStatus: status }),
  setIsFilterApplied: isApplied => set({ isFilterApplied: isApplied }),
  toggleDropdown: isOpen => set({ isDropdownOpen: isOpen }),

  userStatus: 'loggedOut',
  id: null,
  role: null,

  login: (id, role) => {
    set({ id, role, userStatus: role === 'admin' ? 'admin' : 'normal' });
    if (typeof window !== 'undefined') {
      localStorage.setItem('userId', id);
      localStorage.setItem('role', role);
    }
  },

  logout: () => {
    set({ id: null, role: null, userStatus: 'loggedOut' });
    if (typeof window !== 'undefined') {
      localStorage.removeItem('userId');
      localStorage.removeItem('role');
      localStorage.removeItem('accessToken');
    }
  },

  setUserStatus: status => set({ userStatus: status }),
  setLoading: (isLoading: boolean) => set({ isLoading })
}));

export default useStore;
