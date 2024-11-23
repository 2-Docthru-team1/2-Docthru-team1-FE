import { create } from 'zustand';

interface StoreState {
  keyword: string;
  category: string;
  setKeyword: (keyword: string) => void;
  setCategory: (category: string) => void;

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

export default useStore;
