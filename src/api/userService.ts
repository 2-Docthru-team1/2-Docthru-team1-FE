import { getRequest } from './api';

export const getUser = async () => {
  const res = await getRequest(`/auth/me`);
  return res.data;
};
