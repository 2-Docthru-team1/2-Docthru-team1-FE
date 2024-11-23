export type UserStatus = 'loggedOut' | 'normal' | 'admin';

export interface UserContextType {
  userStatus: UserStatus;
  setUserStatus: (status: UserStatus) => void;
}
