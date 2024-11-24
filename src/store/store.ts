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
<<<<<<< HEAD
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
=======

  userStatus: 'loggedOut' | 'normal' | 'admin';
  userId: string | null;
  role: 'normal' | 'admin' | null;
  login: (userId: string, role: 'normal' | 'admin') => void;
  logout: () => void;
  setUserStatus: (status: 'loggedOut' | 'normal' | 'admin') => void;
}

const useStore = create<StoreState>((set: (partial: Partial<StoreState>) => void) => {
  const storedUserId = localStorage.getItem('userId');
  const storedRole = localStorage.getItem('role') as 'normal' | 'admin' | null;
  const initialUserStatus = storedRole === 'admin' ? 'admin' : storedRole === 'normal' ? 'normal' : 'loggedOut';

  return {
    keyword: '',
    category: '',
    setKeyword: (keyword: string) => set({ keyword }),
    setCategory: (category: string) => set({ category }),

    userStatus: initialUserStatus,
    userId: storedUserId || null,
    role: storedRole || null,

    login: (userId: string, role: 'normal' | 'admin') => {
      set({ userId, role, userStatus: role === 'admin' ? 'admin' : 'normal' });
      localStorage.setItem('userId', userId);
      localStorage.setItem('role', role);
    },

    logout: () => {
      set({ userId: null, role: null, userStatus: 'loggedOut' });
      localStorage.removeItem('userId');
      localStorage.removeItem('role');
      localStorage.removeItem('accessToken');
    },

    setUserStatus: (status: 'loggedOut' | 'normal' | 'admin') => set({ userStatus: status })
  };
});
>>>>>>> 8711591e3d64b6acdd440ee287cb67a4fad12dc9

export default useStore;
