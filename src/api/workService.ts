import { getRequest } from './api';

export const getWorkDetail = async (workId: string) => {
  const res = await getRequest(`/works/${workId}`);
  return res.data;
};
