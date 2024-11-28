import { useEffect } from 'react';
import useStore from '@/store/store';

export const useClientSyncStore = () => {
  const setUserId = useStore(state => state.login);
  const logout = useStore(state => state.logout);
  const setLoading = useStore(state => state.setLoading);

  useEffect(() => {
    const syncWithLocalStorage = async () => {
      const storedUserId = localStorage.getItem('userId');
      const storedRole = localStorage.getItem('role') as 'normal' | 'admin' | null;

      if (storedUserId && storedRole) {
        setUserId(storedUserId, storedRole);
        setLoading(false);
      } else {
        logout();
        setLoading(false);
      }
    };
    syncWithLocalStorage();
  }, [setUserId, logout, setLoading]);
};
