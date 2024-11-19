import { getRequest } from './api';

export const fetchChallenge = async () => {
  const response = await getRequest('/challengeMockData.json');
  return response.data;
};

export const fetchChallenge_detail = async (id: string) => {
  const response = await getRequest(`/challengeMockData.json`);
  const challenge = response.data.find((item: { id: number }) => item.id === parseInt(id));
  return challenge;
};
