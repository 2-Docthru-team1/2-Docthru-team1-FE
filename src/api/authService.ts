import { getRequest, postRequest } from './api';

export const getUser = async () => {
  const res = await getRequest(`/auth/me`);
  return res.data;
};

export const signup = async (email: string, name: string, password: string) => {
  const res = await postRequest(`/auth/signUp`, { email, name, password });
  return res.data;
};
