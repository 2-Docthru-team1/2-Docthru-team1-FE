import { getRequest } from './api';

export const getWorkDetail = async (workId: string) => {
  const res = await getRequest('/workMockData.json');
  const work = res.data.find((item: { id: number }) => item.id === parseInt(workId));
  return work;
};
