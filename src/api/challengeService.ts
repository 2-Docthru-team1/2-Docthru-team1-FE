import type { AxiosResponse } from 'axios';
import type { ChallengeParticipantStatusData } from '@/interfaces/cardInterface';
import { getRequest } from './api';

export const fetchChallenge = async () => {
  const response = await getRequest('/challenges');
  return response.data;
};

export const fetchRanker = async () => {
  const response = await getRequest('/rankerMockData.json');
  return response.data;
};

export const fetchAdminChallenge = async () => {
  const response = await getRequest('/adminchallengeMockData.json');
  return response.data;
};

export const fetchChallenge_detail = async (id: string) => {
  const response = await getRequest(`/challengeMockData.json`);
  const challenge = response.data.find((item: { id: number }) => item.id === parseInt(id));
  return challenge;
};

export const fetchChallengeStatus = async (): Promise<ChallengeParticipantStatusData[]> => {
  const response: AxiosResponse<ChallengeParticipantStatusData[]> = await getRequest('/ChallengeStatusData.json');
  return response.data;
};
