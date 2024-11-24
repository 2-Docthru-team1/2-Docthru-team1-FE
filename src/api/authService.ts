import type { SignUpData } from '@/interfaces/userInterface';
import { postRequest } from './api';

export const signUp = async (userData: SignUpData) => {
  try {
    const res = await postRequest(`/auth/signUp`, userData);
    return res.data;
  } catch (error) {
    throw error;
  }
};
