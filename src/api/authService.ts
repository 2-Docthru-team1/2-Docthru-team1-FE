import type { SingInData } from '@/interfaces/userInterface';
import { postRequest } from './api';

export const signUp = async (userData: SingInData) => {
  const res = await postRequest(`/auth/signUp`, userData);
  return res.data;
};
