import { getRequest, patchRequest } from './api';

export const getUser = async () => {
  const res = await getRequest(`/auth/me`);
  return res.data;
};

export const getNotification = async () => {
  const res = await getRequest(`/notifications`);
  return res.data;
};

export const patchIsReadTrue = async (notificationId: string) => {
  const res = await patchRequest(`/notifications/${notificationId}`, {
    isRead: true
  });
  return res.data;
};
