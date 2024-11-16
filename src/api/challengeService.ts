import { getRequest } from './api';

export const fetchChallenges = async () => {
  const response = await getRequest('/challengeMockdata.json');
  return response.data;
};
