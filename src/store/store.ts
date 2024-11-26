import { useEffect } from 'react';
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
  userId: string | null;
  role: 'normal' | 'admin' | null;
  login: (userId: string, role: 'normal' | 'admin') => void;
  logout: () => void;
  setUserStatus: (status: 'loggedOut' | 'normal' | 'admin') => void;
}

// const initialUserStatus = storedRole === 'admin' ? 'admin' : storedRole === 'normal' ? 'normal' : 'loggedOut';

// userStatus: initialUserStatus,
// userId: storedUserId || null,
// role: storedRole || null,

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
  toggleDropdown: isOpen => set({ isDropdownOpen: isOpen }),

  userStatus: 'loggedOut',
  userId: null,
  role: null,

  login: (userId, role) => {
    set({ userId, role, userStatus: role === 'admin' ? 'admin' : 'normal' });
    if (typeof window !== 'undefined') {
      localStorage.setItem('userId', userId);
      localStorage.setItem('role', role);
    }
  },

  logout: () => {
    set({ userId: null, role: null, userStatus: 'loggedOut' });
    if (typeof window !== 'undefined') {
      localStorage.removeItem('userId');
      localStorage.removeItem('role');
      localStorage.removeItem('accessToken');
    }
  },

  setUserStatus: status => set({ userStatus: status })
}));

export const useClientSyncStore = () => {
  const setUserId = useStore(state => state.login);
  const logout = useStore(state => state.logout);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUserId = localStorage.getItem('userId');
      const storedRole = localStorage.getItem('role') as 'normal' | 'admin' | null;
      if (storedUserId && storedRole) {
        setUserId(storedUserId, storedRole);
      } else {
        logout();
      }
    }
  }, [setUserId, logout]);
};

export default useStore;
