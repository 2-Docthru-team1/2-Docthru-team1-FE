import { getRequest } from './api';

export const getUser = async () => {
  const res = await getRequest('/userMockData.json');
  return res.data;
};
