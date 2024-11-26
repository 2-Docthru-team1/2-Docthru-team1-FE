import type { AxiosResponse } from 'axios';
import type {
  ChallengeParticipantStatusData,
  ChallengeParticipateStatusProps,
  ParticipantStatusData
} from '@/interfaces/cardInterface';
import { getRequest, postRequest } from './api';

export const fetchChallenge = async () => {
  const response = await getRequest('/challenges');
  return response.data;
};

export const getFilteredChallenges = async () => {
  const { list, totalCount } = await fetchChallenge();
  const filteredList = list.filter((list: { status: string }) => ['onGoing', 'finished'].includes(list.status));

  return { list: filteredList, totalCount };
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

export const fetchChallengeRequest = async (data: object) => {
  try {
    const response = await postRequest('/challenges', data);

    return response.data;
  } catch (err: any) {
    let errorMessage = 'An unexpected error occurred. Please try again.';
    if (err?.response?.data?.field === '요청 형식이 잘못되었습니다.') {
      errorMessage = '요청 형식이 잘못되었습니다.';
    }
    if (err?.response?.data?.field === '먼저 로그인해 주세요.') {
      errorMessage = '먼저 로그인해 주세요.';
    }
    alert(errorMessage);
  }
};
