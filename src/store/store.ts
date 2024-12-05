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
  challengeMgmtTotalCount: number;
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
  name: string | null;
  isLoading: boolean;
  login: (id: string, role: 'normal' | 'admin', name: string) => void;
  logout: () => void;
  setUserStatus: (status: 'loggedOut' | 'normal' | 'admin') => void;
  setLoading: (isLoading: boolean) => void;
  setChallengeMgmtTotalCount: (count: number) => void;
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
  challengeMgmtTotalCount:
    typeof window !== 'undefined' && localStorage.getItem('challengeMgmtTotalCount')
      ? Number(localStorage.getItem('challengeMgmtTotalCount'))
      : 0,

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
  name: null,

  login: (id, role, name) => {
    set({ id, role, userStatus: role === 'admin' ? 'admin' : 'normal', name });
    if (typeof window !== 'undefined') {
      localStorage.setItem('userId', id);
      localStorage.setItem('role', role);
      localStorage.setItem('name', name);
    }
  },

  logout: () => {
    set({ id: null, role: null, userStatus: 'loggedOut', name: null });
    if (typeof window !== 'undefined') {
      const { id } = useStore.getState();
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith(`challengeTrySaveData-${id}-`)) {
          localStorage.removeItem(key);
        }
      });
      localStorage.removeItem('userId');
      localStorage.removeItem('role');
      localStorage.removeItem('name');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('challengeMgmtTotalCount');
    }
  },

  setUserStatus: status => set({ userStatus: status }),
  setLoading: (isLoading: boolean) => set({ isLoading }),

  setChallengeMgmtTotalCount: count => {
    set({ challengeMgmtTotalCount: count });
    if (typeof window !== 'undefined') {
      localStorage.setItem('challengeMgmtTotalCount', count.toString());
    }
  }
}));

export default useStore;
