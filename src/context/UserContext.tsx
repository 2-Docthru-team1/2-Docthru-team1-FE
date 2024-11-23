'use client';

import { type ReactNode, createContext, useContext, useState } from 'react';
import type { UserContextType, UserStatus } from '@/interfaces/userContextInterface';

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [userStatus, setUserStatus] = useState<UserStatus>('loggedOut');

  const login = (role: UserStatus) => {
    setUserStatus(role);
  };

  return <UserContext.Provider value={{ userStatus, setUserStatus: login }}>{children}</UserContext.Provider>;
}

export function useUserStatus() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserStatus must be used within a UserProvider');
  }
  return context;
}
