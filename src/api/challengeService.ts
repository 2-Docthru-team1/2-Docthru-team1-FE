import type { AxiosResponse } from 'axios';
import type {
  ChallengeParticipantStatusData,
  ChallengeParticipateStatusProps,
  ParticipantStatusData
} from '@/interfaces/cardInterface';
import { getRequest } from './api';

export const fetchChallenge = async () => {
  const response = await getRequest('/challenges');
  return response.data;
};

export const fetchRanker = async () => {
  const response = await getRequest('http://localhost:3000/rankerMockData.json');
  return response.data;
};

export const fetchAdminChallenge = async () => {
  const response = await getRequest('http://localhost:3000/adminchallengeMockData.json');
  return response.data;
};

export const fetchChallenge_detail = async (id: string) => {
  const response = await getRequest(`/challenges/${id}`);
  return response.data;
};

export const fetchChallengeStatus = async (id: string, page: number): Promise<ChallengeParticipateStatusProps> => {
  const params = {
    page: page,
    pageSize: 4
  };
  const response = await getRequest(`/challenges/${id}/works`, { params });
  return response.data;
};
