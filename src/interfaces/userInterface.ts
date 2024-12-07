export interface UserData {
  id: string;
  role: 'admin' | 'normal';
}

export interface SignUpData {
  email: string;
  name: string;
  password: string;
}

export interface ProfileModalProps {
  name: string;
  role: 'admin' | 'normal';
}
