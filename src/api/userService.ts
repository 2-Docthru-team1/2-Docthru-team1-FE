import { getRequest } from './api';

export const getUser = async () => {
  const res = await getRequest(`/auth/me`);
  return res.data;
};

export const getNotification = async () => {
  const res = await getRequest(`/notifications`);
  return res.data;
};
