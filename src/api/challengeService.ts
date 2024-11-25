import type { AxiosResponse } from 'axios';
import type { ChallengeParticipantStatusData } from '@/interfaces/cardInterface';
import { getRequest, postRequest } from './api';

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
  const response = await getRequest(`/challengeMockData.json`);
  const challenge = response.data.challengeData.find((item: { id: string }) => item.id === id);
  return challenge;
};

export const fetchChallengeStatus = async (): Promise<ChallengeParticipantStatusData[]> => {
  const response: AxiosResponse<ChallengeParticipantStatusData[]> = await getRequest('/ChallengeStatusData.json');
  return response.data;
};

export const fetchChallengeRequest = async (data: object) => {
  console.log(data);
  try {
    const response = await postRequest('/challenges', data);
    console.log('API Response Data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error in fetchChallengeRequest:', error);
    throw error; // 에러 처리
  }
};
